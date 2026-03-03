<template>
  <div>
    <!-- 套餐页面标题区 -->
    <v-parallax
      :src="require('@/assets/background.jpg') || 'https://picsum.photos/1920/1080?random=1'"
      height="400"
      class="page-header"
    >
      <div class="overlay"></div>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold white--text mb-4">Our Packages</h1>
            <p class="text-h6 white--text">
              Comprehensive funeral service packages tailored to your needs
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>

    <!-- 套餐分类标签 -->
    <v-container class="package-container mt-n10">
      <!-- 添加加载状态 -->
      <v-overlay :value="loading" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <!-- 添加错误提示 -->
      <v-alert
        v-if="error"
        type="error"
        dismissible
        class="mb-4"
      >
        {{ error }}
      </v-alert>

      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-card class="mx-auto category-card" elevation="6">
            <v-tabs
              v-model="activeTab"
              centered
              grow
              background-color="transparent"
            >
              <v-tab v-for="category in categories" :key="category">
                {{ category }}
              </v-tab>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>

      <!-- 套餐列表 -->
      <v-row class="mt-8">
        <v-col v-for="item in filteredPackages" :key="item.id" cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card
              class="package-card mx-auto"
              :elevation="hover ? 12 : 4"
              :class="{ 'on-hover': hover }"
            >
              <v-img 
                :src="item.image" 
                height="250"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)"
              >
                <v-card-title class="text-h5">{{ item.name }}</v-card-title>
              </v-img>

              <v-card-text class="pt-4">
                <div class="package-price mb-4">
                  <span class="text-h4 font-weight-bold accent--text">${{ item.price }}</span>
                  <span class="text-subtitle-1 grey--text ml-2">onwards</span>
                </div>
                <div class="package-features mb-4">
                  <v-list dense>
                    <v-list-item v-for="(feature, i) in item.features" :key="i">
                      <v-list-item-icon class="mr-2">
                        <v-icon color="success" small>mdi-check-circle</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-2">{{ feature }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </div>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="pa-4">
                <v-btn
                  block
                  color="primary"
                  elevation="2"
                  height="44"
                  @click="showPackageDetails(item)"
                >
                  View Details
                </v-btn>
              </v-card-actions>

              <div v-if="item.popular" class="popular-badge">
                Popular Choice
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>

    <!-- 套餐详情对话框 -->
    <v-dialog v-model="dialog" max-width="800">
      <v-card v-if="selectedPackage">
        <v-img
          :src="selectedPackage.image"
          height="300"
          gradient="to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)"
        >
          <v-card-title class="white--text text-h4">
            {{ selectedPackage.name }}
          </v-card-title>
        </v-img>
        
        <v-card-text class="pa-6">
          <div class="text-h4 accent--text mb-4">
            ${{ selectedPackage.price }}
            <span class="text-subtitle-1 grey--text">onwards</span>
          </div>
          <p class="text-body-1 mb-6 package-description">{{ selectedPackage.detailDescription || selectedPackage.description }}</p>
          
          <h3 class="text-h6 mb-4">Package Includes:</h3>
          <v-list dense>
            <v-list-item v-for="(feature, i) in (selectedPackage.detailFeatures || selectedPackage.features)" :key="i">
              <v-list-item-icon>
                <v-icon color="success">mdi-check-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ feature }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-btn
            color="primary"
            class="mr-2"
            @click="makePhoneCall"
          >
            <v-icon left>mdi-phone</v-icon>
            Call Us
          </v-btn>
          <v-btn
            color="success"
            @click="openWhatsApp"
          >
            <v-icon left>mdi-whatsapp</v-icon>
            WhatsApp
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'Packages',
  data: () => ({
    loading: false,
    error: null,
    activeTab: 0,
    dialog: false,
    selectedPackage: null,
    categories: ['All Packages', 'Casket Services'],
    packages: [
      {
        id: 1,
        name: 'Essential Package',
        // price: 2888,
        category: 'Casket Services',
        image: require('@/assets/funer3.jpg') || 'https://picsum.photos/500/300?random=1',
        description: 'Basic funeral service package with essential items',
        popular: true,
        features: [
          'Standard Casket',
          'Basic Funeral Setup',
          'Transportation Service',
          '2 Days Service Duration',
          'Basic Religious Items'
        ]
      },
      {
        id: 2,
        name: 'Taoist Package',
        // price: 6888,
        category: 'Casket Services',
        image: require('@/assets/funer5.jpg') || 'https://picsum.photos/500/300?random=2',
        description: 'Comprehensive funeral service package with premium features',
        popular: false,
        features: [
          'Premium Quality Casket',
          'Complete Funeral Setup',
          'Transportation Service',
          '3 Days Service Duration',
          'Complete Religious Items',
          'Professional Funeral Director',
          'Photography Service'
        ],
        detailDescription: `5 days Taoist Funeral Package*

Casket & Services
1) Premium casket with half glass viewing 棺木
2) Premium Limousine Hearse / Grand Traditional Hearse 灵车 / 传统灵车
3) Manpower & Services 工人 和 运输 — Collection of deceased from hospital or home; Sending deceased back to the wake; Funeral ceremony; Booking of cremation; E Funeral notice; Ash collection services
4) Professional embalming & makeup services 清洗化妆和防腐

Wake Setup
5) Tentage Setup (HDB Setup) 棚布，灯，桌子 和 椅子 — 18" Wake enclosure; Curtain and carpet setup; 10 round tables with 100 chairs; *10 sets of tables and chairs cover setup*; 15 Square tables; 6 Standing fans; General lighting
6) Lanterns with surname & age inscription 灯笼
7) Taoist Religious Setup 灵堂布置
8) Reception Table Setup 白金桌，保险箱 白金书等等 — Safe box; Condolence book
9) Plastic folder & stationary set 文具套
10) Photo Enlargement Service — 6 Passport size photo 照片放大服务
11) Flora Arrangement 桌子花 和 相片花 — 2 Deceased table; 1 Photo frame wreath
12) Mobile Toilet 流动厕所

Funeral Preparation / Ceremony
13) Guidance during Encoffin and Funeral Day 第一天，最后一晚 和 最后一天教拜
14) 8ft Paper house 纸屋金山银山 衣箱 甲万 ， 茶童 — Gold & Silver mountains; Paper servants; 1 Clothing chest; 1 Safe box
15) Pearl for Deceased 珠
16) Mourning Badges 孝布
17) Air conditioned bus 45-Seater 巴士
18) Cleansing Water 花水

*Items not included in package*
- Mandai Cremation Fee ($100) 火化费
- Drinks & Fridge (Estimated $800) 冰箱水料 (Consignment)
- Incense paper, mourning clothing, offerings and ceremonial Items ($3,500) 金纸，善堂供品，衣服，裤子，等等
- Tentage for Prayer ($1500) 善堂棚
- Final night Siang Teng chanting 善堂 （$2800）We uses good Siang Teng
- Metal Cage for Burning and Labour to shift the paper products ($300) 铁笼 和员工
- Red Packet for Staffs, Undertakers, Priest and Hearse Driver 红包

*Estimated spending $18,800*

Buffet not inclusive`,
        detailFeatures: [
          'Premium casket with half glass viewing 棺木',
          'Premium Limousine Hearse / Grand Traditional Hearse 灵车 / 传统灵车',
          'Manpower & Services 工人 和 运输',
          'Professional embalming & makeup services 清洗化妆和防腐',
          'Tentage Setup (HDB) 棚布，灯，桌子 和 椅子',
          'Lanterns with surname & age inscription 灯笼',
          'Taoist Religious Setup 灵堂布置',
          'Reception Table Setup 白金桌，保险箱 白金书',
          'Plastic folder & stationary set 文具套',
          'Photo Enlargement Service 照片放大服务',
          'Flora Arrangement 桌子花 和 相片花',
          'Mobile Toilet 流动厕所',
          'Guidance during Encoffin and Funeral Day',
          '8ft Paper house 纸屋金山银山 衣箱 甲万 茶童',
          'Pearl for Deceased 珠',
          'Mourning Badges 孝布',
          'Air conditioned bus 45-Seater 巴士',
          'Cleansing Water 花水'
        ]
      },
      {
        id: 3,
        name: 'Buddhist Package',
        // price: 5888,
        category: 'Casket Services',
        image: require('@/assets/funer6.jpg') || 'https://picsum.photos/500/300?random=3',
        description: 'Traditional Buddhist funeral service package',
        popular: false,
        features: [
          'Premium Quality Casket',
          'Buddhist Ceremony Setup',
          'Monk Services',
          '3 Days Service Duration',
          'Buddhist Religious Items',
          'Professional Funeral Director',
          'Photography Service'
        ],
        detailDescription: `5 Days Buddhist Funeral Package

五天佛教丧礼配套

Casket & Services 棺木与基本服务
1) Premium casket with half glass viewing 高级半玻璃棺木
2) Premium Hearse / Glass Panel Hearse 高级灵车
3) Manpower & Services 工人与运输 — Collection of deceased from hospital or home 接遗体（医院或住家）; Sending deceased back to the wake 送回灵堂; Funeral ceremony coordination 丧礼统筹安排; Booking of cremation 代订火化时间; E-Funeral notice 电子讣告; Ash collection services 代领骨灰服务
4) Professional embalming & makeup services 专业清洗、防腐与化妆

Wake Setup 灵堂布置
5) Tentage Setup (HDB Setup) 棚布、灯光、桌椅 — 18" Wake enclosure 灵堂围布; Curtain and carpet setup 帘布与地毯; 10 round tables with 100 chairs 10张圆桌+100张椅子; 10 sets of table & chair covers 桌椅套; 15 square tables 15张方桌; 6 standing fans 6台风扇; General lighting 基本灯光设备
6) Lanterns with surname & age inscription 姓氏与年龄灯笼
7) Buddhist Religious Setup 佛教灵堂布置（佛像、供桌等）
8) Reception Table Setup 白金桌布置 — Safe box 保险箱; Condolence book 白金簿
9) Stationery set 文具套装
10) Photo Enlargement Service 照片放大服务 — 6 passport size photos 6张护照尺寸照片
11) Floral Arrangement 花艺布置 — 2 deceased table flowers 2组桌花; 1 photo frame wreath 1组相框花圈
12) Mobile Toilet 流动厕所

Funeral Preparation / Ceremony 仪式与准备
13) Guidance during Encoffin & Funeral Day 封棺与出殡当天指导
14) Buddhist Chanting Setup 佛教诵经法事安排（Based on family preference – 1 session chanting 包含一场基本诵经）
15) Offering Table Setup 供品桌布置
16) Mourning Badges 孝布
17) Air-conditioned bus 45-seater 45座冷气巴士
18) Cleansing Water 花水

Items Not Included in Package 不包含项目
• Mandai Cremation Fee ($100) 火化费
• Drinks & Fridge (Estimated $800) 冰箱与水料
• Additional chanting sessions (price varies) 额外诵经法事
• Incense paper & ceremonial offerings ($2,500 – $3,500 estimated) 金纸与供品
• Tentage for additional prayer area ($1,500) 额外善堂棚
• Metal cage for burning & labour ($300) 烧金纸铁笼与人工
• Red packets for staffs, priest & hearse driver 红包

Estimated Spending: $16,000 – $18,000 预计总花费：$16,000 – $18,000

Buffet not inclusive 不包含自助餐`,
        detailFeatures: [
          'Premium casket with half glass viewing 高级半玻璃棺木',
          'Premium Hearse / Glass Panel Hearse 高级灵车',
          'Manpower & Services 工人与运输',
          'Professional embalming & makeup services 专业清洗、防腐与化妆',
          'Tentage Setup (HDB) 棚布、灯光、桌椅',
          'Lanterns with surname & age inscription 姓氏与年龄灯笼',
          'Buddhist Religious Setup 佛教灵堂布置',
          'Reception Table Setup 白金桌布置',
          'Stationery set 文具套装',
          'Photo Enlargement Service 照片放大服务',
          'Floral Arrangement 花艺布置',
          'Mobile Toilet 流动厕所',
          'Guidance during Encoffin & Funeral Day',
          'Buddhist Chanting Setup 佛教诵经法事安排',
          'Offering Table Setup 供品桌布置',
          'Mourning Badges 孝布',
          'Air-conditioned bus 45-seater 巴士',
          'Cleansing Water 花水'
        ]
      },
      {
        id: 4,
        name: 'Catholic Package',
        // price: 4888,
        category: 'Casket Services',
        image: require('@/assets/funer4.jpg') || 'https://picsum.photos/500/300?random=4',
        description: 'Traditional Catholic funeral service package',
        popular: false,
        features: [
          'Premium Quality Casket',
          'Catholic Ceremony Setup',
          'Priest Services',
          '2 Days Service Duration',
          'Catholic Religious Items',
          'Professional Funeral Director',
          'Photography Service'
        ]
      },
      {
        id: 5,
        name: 'Free-thinker Package',
        // price: 3888,
        category: 'Casket Services',
        // image: require('@/assets/gallery/freethinker.jpg') || 'https://picsum.photos/500/300?random=5',
        description: 'Customizable funeral service package for free-thinkers',
        popular: false,
        features: [
          'Standard Quality Casket',
          'Custom Ceremony Setup',
          'Flexible Service Duration',
          'Basic Religious Items (Optional)',
          'Professional Funeral Director',
          'Photography Service'
        ]
      }
    ],
    phoneNumber: '+6585009891',
    whatsappNumber: '+6585009891',
  }),
  computed: {
    filteredPackages() {
      if (this.activeTab === 0) return this.packages;
      return this.packages.filter(p => p.category === this.categories[this.activeTab]);
    }
  },
  methods: {
    showPackageDetails(packageItem) {
      this.selectedPackage = packageItem;
      this.dialog = true;
    },
    requestConsultation(packageItem) {
      this.dialog = false;
      this.$router.push({ 
        path: '/', 
        query: { 
          service: packageItem.name,
          scroll: 'consultation'
        } 
      });
    },
    makePhoneCall() {
      window.location.href = `tel:${this.phoneNumber}`
    },
    openWhatsApp() {
      window.open(`https://wa.me/${this.whatsappNumber}`, '_blank')
    }
  },
  async created() {
    this.loading = true;
    this.error = null;
    try {
      const response = await api.getPackages();
      if (response.data) {
        this.packages = response.data;
      }
    // } catch (error) {
    //   console.error('获取套餐信息失败:', error);
    //   this.error = '无法加载套餐信息，请稍后再试';
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.page-header {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7));
}

.package-container {
  position: relative;
}

.category-card {
  border-radius: 12px;
  overflow: hidden;
}

.package-card {
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.package-card .v-card__text {
  flex-grow: 1;
}

.package-card .v-card__actions {
  margin-top: auto;
  padding: 16px;
  background: rgba(0,0,0,0.02);
}

.package-card.on-hover {
  transform: translateY(-8px);
}

.package-price {
  position: relative;
  display: flex;
  align-items: baseline;
}

.popular-badge {
  position: absolute;
  top: 20px;
  right: -35px;
  background: var(--v-accent-base);
  color: white;
  padding: 8px 40px;
  transform: rotate(45deg);
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 1;
}

.package-features {
  border-radius: 8px;
  background: rgba(0,0,0,0.02);
}

.package-description {
  white-space: pre-line;
}

@media (max-width: 960px) {
  .package-container {
    margin-top: -60px;
  }
}

.v-overlay {
  z-index: 5;
}

.package-image {
  object-fit: cover;
  aspect-ratio: 16/9;
  min-height: 250px;
  max-height: 250px;
}
</style> 