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
          <p class="text-body-1 mb-6">{{ selectedPackage.description }}</p>
          
          <h3 class="text-h6 mb-4">Package Includes:</h3>
          <v-list dense>
            <v-list-item v-for="(feature, i) in selectedPackage.features" :key="i">
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
    phoneNumber: '+6588005559',
    whatsappNumber: '+6588005559',
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