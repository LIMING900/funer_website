<template>
  <v-app>
    <!-- 顶部联系信息栏 -->
    <v-system-bar color="primary" dark height="36" class="px-6">
      <v-icon small class="mr-2">mdi-phone</v-icon>
      <span class="text-caption">24/7 Hotline: +65 8800 5559</span>
      <v-spacer></v-spacer>
      <v-icon small class="mr-2">mdi-email</v-icon>
      <span class="text-caption mr-4">contact@andycasket.com</span>
      <v-divider vertical class="mx-2"></v-divider>
      <v-btn icon small href="https://facebook.com" target="_blank" class="social-btn">
        <v-icon small>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon small href="https://instagram.com" target="_blank" class="social-btn">
        <v-icon small>mdi-instagram</v-icon>
      </v-btn>
    </v-system-bar>

    <!-- 主导航栏 -->
    <v-app-bar app color="white" elevation="1" height="90" class="nav-bar">
      <v-container class="py-0 fill-height">
        <div class="d-flex align-center justify-space-between full-width">
          <router-link to="/" class="text-decoration-none d-flex align-center">
            <v-toolbar-title class="company-title">
              <div class="d-flex align-center">
                <!-- <v-img
                  :src="require('@/assets/companyTitle.jpg')"
                  max-height="50"
                  max-width="50"
                  contain
                  class="mr-4 company-logo"
                ></v-img> -->
                <div class="company-name-group">
                  <span class="font-weight-bold company-name">
                    <span class="company-name-first">Andy</span>
                    <span class="company-name-highlight">Casket</span>
                    <span class="company-name-last">Services</span>
                  </span>
                  <span class="company-tagline">Professional Funeral Services</span>
                </div>
              </div>
            </v-toolbar-title>
          </router-link>

          <div class="d-flex align-center">
            <div class="nav-menu">
              <v-tabs height="90" background-color="transparent" slider-color="accent">
                <v-tab 
                  v-for="item in menuItems" 
                  :key="item.path" 
                  :to="item.path" 
                  :exact="item.exact"
                  class="nav-link"
                >
                  <v-icon class="mb-1">{{ item.icon }}</v-icon>
                  <span class="mt-1">{{ item.text }}</span>
                </v-tab>
              </v-tabs>
            </div>
            
            <v-btn
              color="accent"
              class="ml-4 contact-btn"
              rounded
              elevation="2"
              height="44"
              x-large
              @click="showContactMenu = true"
            >
              <v-icon left>mdi-phone</v-icon>
              Contact Us
            </v-btn>
          </div>
        </div>
      </v-container>
                  <!-- 用户未登录时显示登录按钮 -->
                  <template v-if="!user">
              <v-btn
                color="primary"
                class="ml-4 auth-btn"
                text
                to="/login"
              >
                <v-icon left>mdi-login</v-icon>
                Login
              </v-btn>
            </template>
            
            <!-- 用户已登录时显示用户菜单 -->
            <template v-else>
              <v-menu
                offset-y
                transition="slide-y-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    class="ml-4"
                    text
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>mdi-account-circle</v-icon>
                    {{ user.name }}
                    <v-icon right>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                
                <v-list>
                  <v-list-item to="/profile">
                    <v-list-item-icon>
                      <v-icon>mdi-account-edit</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item>
                  
                  <v-divider></v-divider>
                  
                  <v-list-item @click="logout">
                    <v-list-item-icon>
                      <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
    </v-app-bar>

    <!-- 主内容区 -->
    <v-main class="main-background">
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- 页脚 -->
    <v-footer color="primary" dark class="footer-section pt-12 pb-4">
      <v-container>
        <v-row>
          <!-- 公司信息 -->
          <v-col cols="12" md="4">
            <div class="footer-brand mb-6">
              <h3 class="text-h5 font-weight-bold gold-text mb-4">Andy Casket Service</h3>
              <p class="text-body-2 grey--text text--lighten-1">
                Professional funeral services available 24/7. Providing dignified and compassionate care for your loved ones.
              </p>
            </div>
            <div class="social-links mt-6">
              <v-btn
                v-for="(social, i) in socialLinks"
                :key="i"
                :href="social.link"
                target="_blank"
                icon
                class="mr-4 social-btn"
                :class="social.class"
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </div>
          </v-col>

          <!-- 联系信息 -->
          <v-col cols="12" md="4">
            <h3 class="text-h6 font-weight-bold mb-6">Contact Info</h3>
            <v-list color="transparent" dark class="contact-list pa-0">
              <v-list-item 
                v-for="(contact, i) in contactInfo"
                :key="i"
                class="px-0 contact-item"
              >
                <v-list-item-icon class="mr-3">
                  <v-icon :color="contact.color">{{ contact.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-body-2">{{ contact.title }}</v-list-item-title>
                  <v-list-item-subtitle class="text-caption grey--text text--lighten-1">
                    {{ contact.subtitle }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <!-- 快速链接 -->
          <v-col cols="12" md="4">
            <h3 class="text-h6 font-weight-bold mb-6">Quick Links</h3>
            <v-list color="transparent" dark class="quick-links pa-0">
              <v-list-item 
                v-for="(link, i) in quickLinks" 
                :key="i" 
                :to="link.to" 
                class="px-0 quick-link-item"
              >
                <v-list-item-icon class="mr-3">
                  <v-icon small color="accent">mdi-chevron-right</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-body-2">{{ link.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-divider class="my-6 opacity-1"></v-divider>
        
        <!-- 版权信息 -->
        <v-row justify="space-between" align="center" class="copyright-section">
          <v-col cols="12" md="auto">
            <span class="text-caption grey--text text--lighten-1">
              &copy; {{ new Date().getFullYear() }} Andy Casket Services. All Rights Reserved.
            </span>
          </v-col>
          <v-col cols="12" md="auto" class="mt-4 mt-md-0">
            <a href="/privacy-policy" class="text-caption grey--text text--lighten-1 text-decoration-none mr-4 footer-link">Privacy Policy</a>
            <a href="/terms-of-service" class="text-caption grey--text text--lighten-1 text-decoration-none footer-link">Terms of Service</a>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>

    <!-- 添加联系方式弹出菜单 -->
    <v-dialog
      v-model="showContactMenu"
      max-width="340"
      transition="dialog-bottom-transition"
    >
      <v-card class="contact-dialog">
        <v-card-title class="headline primary white--text">
          Contact Methods
          <v-spacer></v-spacer>
          <v-btn icon dark @click="showContactMenu = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-list>
            <v-list-item
              @click="makePhoneCall"
              class="contact-option mb-3"
              elevation="2"
            >
              <v-list-item-icon>
                <v-icon color="primary" large>mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="subtitle-1 font-weight-bold">Contact Number</v-list-item-title>
                <v-list-item-subtitle>+65 8800 5559</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              @click="openWhatsApp"
              class="contact-option"
              elevation="2"
            >
              <v-list-item-icon>
                <v-icon color="green" large>mdi-whatsapp</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="subtitle-1 font-weight-bold">WhatsApp Msg</v-list-item-title>
                <v-list-item-subtitle>+65 8800 5559</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- 添加隐私政策对话框 -->
    <v-dialog v-model="privacyDialog" max-width="800">
      <v-card>
        <v-card-title class="text-h5">
          Privacy Policy
          <v-spacer></v-spacer>
          <v-btn icon @click="privacyDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card-text class="privacy-content">
          <p class="text-subtitle-2 mb-2">Effective Date: 1 June 2023</p>

          <h3 class="text-h6 mt-4">1. Introduction</h3>
          <p>Andy Casket Service("we," "us," or "our") respects your privacy and is committed to protecting your personal data in compliance with Singapore's <strong>Personal Data Protection Act (PDPA)</strong>. This policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>

          <h3 class="text-h6 mt-4">2. Data We Collect</h3>
          <p>We may collect:</p>
          <ul>
            <li><strong>Personal details</strong> (name, NRIC/FIN if required, contact info).</li>
            <li><strong>Service-related data</strong> (deceased's information, death certificate, family details).</li>
            <li><strong>Payment details</strong> (credit card/bank account for transactions).</li>
            <li><strong>Technical data</strong> (IP address, cookies, browsing behavior).</li>
          </ul>

          <h3 class="text-h6 mt-4">3. Purpose of Collection</h3>
          <p>Your data is used to:</p>
          <ul>
            <li>Provide funeral/cremation services.</li>
            <li>Process payments and documentation.</li>
            <li>Respond to inquiries or requests.</li>
            <li>Comply with legal obligations (e.g., death registration).</li>
          </ul>

          <h3 class="text-h6 mt-4">4. Data Sharing</h3>
          <p>We only disclose information to:</p>
          <ul>
            <li><strong>Service partners</strong> (hospitals, crematoriums, religious institutions).</li>
            <li><strong>Legal authorities</strong> (if required by law).</li>
            <li><strong>Trusted vendors</strong> (IT/payment processors under confidentiality agreements).</li>
          </ul>

          <h3 class="text-h6 mt-4">5. Cookies & Tracking</h3>
          <p>We use cookies to improve website functionality. You may disable cookies via browser settings, but some features may be affected.</p>

          <h3 class="text-h6 mt-4">6. Data Security & Retention</h3>
          <ul>
            <li>Data is secured via encryption and access controls.</li>
            <li>Retained only as long as necessary (per legal/business needs).</li>
          </ul>

          <h3 class="text-h6 mt-4">7. Your Rights</h3>
          <p>Under PDPA, you may:</p>
          <ul>
            <li>Access or correct your data.</li>
            <li>Withdraw consent (may affect services).</li>
            <li>Lodge complaints with Singapore's <strong>PDPC</strong> (<a href="https://www.pdpc.gov.sg" target="_blank">pdpc.gov.sg</a>).</li>
          </ul>

          <h3 class="text-h6 mt-4">8. Updates</h3>
          <p>We may update this policy; changes will be posted here.</p>

          <div class="mt-6">
            <p><strong>Company Name:</strong> Andy Casket Service</p>
            <p><strong>Address:</strong> [Singapore Registered Address]</p>
            <p><strong>Email/Phone:</strong> [Insert]</p>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="privacyDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    user: null,
    menuItems: [
      { text: 'Home', path: '/', exact: true, icon: 'mdi-home' },
      { text: 'Packages', path: '/packages', exact: false, icon: 'mdi-package-variant' },
      { text: 'E-namecard', path: '/agent', exact: false, icon: 'mdi-card-account-details' },
      // { text: 'Sample display', path: '/gallery', exact: false, icon: 'mdi-image-multiple' }
    ],
    quickLinks: [
      { text: 'Home', to: '/' },
      { text: 'Our Packages', to: '/packages' },
      { text: 'Contact Agent', to: '/agent' },
      // { text: 'Gallery', to: '/gallery' }
    ],
    socialLinks: [
      { icon: 'mdi-facebook', link: 'https://www.facebook.com/p/Andy-Casket-Services-安宇殯葬禮儀社-100075995673049/', class: 'facebook-btn' },
      // { icon: 'mdi-instagram', link: 'https://instagram.com', class: 'instagram-btn' },
      { icon: 'mdi-whatsapp', link: 'https://whatsapp.com', class: 'whatsapp-btn' },
      // { icon: 'mdi-telegram', link: 'https://telegram.org', class: 'telegram-btn' }
    ],
    contactInfo: [
      { 
        icon: 'mdi-phone',
        color: 'accent',
        title: '+65 8800 5559',
        subtitle: '24/7 Hotline Available'
      },
      {
        icon: 'mdi-email',
        color: 'accent',
        title: 'andycasketfuneral@gmail.com',
        subtitle: 'Online Support'
      },
      {
        icon: 'mdi-map-marker',
        color: 'accent',
        title: '29 Sin Ming Dr',
        subtitle: 'Singapore'
      }
    ],
    showContactMenu: false,
    phoneNumber: '+6588115559', // 更换为实际的电话号码
    whatsappNumber: '+6588115559', // 更换为实际的 WhatsApp 号码
    privacyDialog: false,
  }),
  created() {
    // 检查用户是否已登录
    const userData = localStorage.getItem('user')
    if (userData) {
      this.user = JSON.parse(userData)
    }
    
    // 监听登录成功事件
    this.$root.$on('login-success', this.handleLoginSuccess)
    
    // 监听注销事件
    this.$root.$on('logout', this.logout)
    
    // 监听个人资料更新事件
    this.$root.$on('profile-updated', this.handleProfileUpdate)
  },
  beforeDestroy() {
    // 移除事件监听器
    this.$root.$off('login-success', this.handleLoginSuccess)
    this.$root.$off('logout', this.logout)
    this.$root.$off('profile-updated', this.handleProfileUpdate)
  },
  methods: {
    logout() {
      // 清除本地存储中的用户数据
      localStorage.removeItem('user')
      
      // 重置用户状态
      this.user = null
      
      // 如果当前在需要登录的页面，则重定向到首页
      const restrictedRoutes = ['/profile']
      if (restrictedRoutes.includes(this.$route.path)) {
        this.$router.push('/')
      }
      
      // 触发全局事件，通知其他组件用户已注销
      this.$root.$emit('user-logged-out')
    },
    
    handleLoginSuccess(userData) {
      this.user = userData
    },
    
    handleProfileUpdate(updatedUser) {
      this.user = updatedUser
    },
    makePhoneCall() {
      window.location.href = `tel:${this.phoneNumber}`
      this.showContactMenu = false
    },
    openWhatsApp() {
      window.open(`https://wa.me/${this.whatsappNumber}`, '_blank')
      this.showContactMenu = false
    },
    openPrivacyPolicy() {
      this.privacyDialog = true;
    }
  }
}
</script>

<style>
.v-application {
  font-family: "Poppins", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif !important;
}

.main-background {
  background-color: var(--v-background-base) !important;
  min-height: 100vh;
}

/* 导航栏样式 */
.nav-bar {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95) !important;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.full-width {
  width: 100%;
}

.company-title {
  min-width: fit-content !important;
  overflow: visible !important;
  white-space: nowrap !important;
  margin-right: 0 !important;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.company-name-group {
  display: flex;
  flex-direction: column;
}

.company-name {
  font-size: 2.2rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.5px;
  line-height: 1.2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.company-name-first,
.company-name-last {
  color: var(--v-primary-base);
}

.company-name-highlight {
  color: #D4AF37 !important; /* 经典金色 */
  font-weight: 900 !important; /* 更粗的字体 */
  position: relative;
  text-shadow: 
    1px 1px 2px rgba(212, 175, 55, 0.3),
    -1px -1px 2px rgba(212, 175, 55, 0.3); /* 金色阴影效果 */
  background: linear-gradient(
    90deg,
    #D4AF37 0%,    /* 实金色 */
    #FFE5A0 25%,   /* 浅金色 */
    #D4AF37 50%,   /* 实金色 */
    #FFE5A0 75%,   /* 浅金色 */
    #D4AF37 100%   /* 实金色 */
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 6s linear infinite; /* 减慢动画速度 */
}

.company-name-highlight::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(
    90deg,
    #D4AF37,    /* 实金色 */
    #FFE5A0,    /* 浅金色 */
    #D4AF37     /* 实金色 */
  );
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.company-title:hover .company-name-highlight::after {
  transform: scaleX(1);
}

.company-name-first,
.company-name-last {
  color: var(--v-primary-base);
  font-weight: 600 !important; /* 稍微加重其他文字 */
}

.company-tagline {
  font-size: 0.9rem;
  color: var(--v-primary-base);
  opacity: 0.7;
  margin-top: -4px;
  letter-spacing: 1px;
  font-weight: 500;
}

.company-logo {
  transition: transform 0.3s ease;
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
}

.company-title:hover .company-logo {
  transform: scale(1.1) rotate(5deg);
}

.company-name-first,
.company-name-highlight,
.company-name-last {
  transition: all 0.3s ease;
}

.company-title:hover .company-name-first,
.company-title:hover .company-name-last {
  color: var(--v-primary-darken1);
}

.company-title:hover .company-name-highlight {
  color: var(--v-accent-darken1);
}

/* 导航菜单样式 */
.nav-menu {
  display: flex;
  align-items: center;
}

.nav-link {
  min-width: 120px !important;
  height: 90px !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  text-transform: none !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  padding: 0 20px !important;
  transition: all 0.3s ease !important;
}

.nav-link .v-icon {
  font-size: 24px !important;
  margin-bottom: 4px;
}

.nav-link:hover {
  background: rgba(0, 0, 0, 0.03);
}

.contact-btn {
  font-size: 1rem !important;
  padding: 0 24px !important;
}

/* 社交媒体按钮样式 */
.social-btn {
  transition: all 0.3s ease !important;
  opacity: 0.8;
}

.social-btn:hover {
  opacity: 1;
  transform: translateY(-2px);
}

/* 响应式调整 */
@media (max-width: 1264px) {
  .company-name {
    font-size: 2rem !important;
  }

  .nav-link {
    min-width: 80px !important;
    padding: 0 12px !important;
  }
  
  .contact-btn {
    padding: 0 16px !important;
  }
}

@media (max-width: 960px) {
  .v-app-bar {
    height: auto !important;
  }

  .nav-bar .v-container {
    padding: 16px;
  }

  .d-flex.align-center.justify-space-between {
    flex-direction: column;
  }

  .company-name {
    font-size: 1.8rem !important;
  }

  .company-tagline {
    font-size: 0.85rem;
  }

  .d-flex.align-center {
    flex-direction: column;
    width: 100%;
    margin-top: 16px;
  }

  .nav-menu {
    width: 100%;
  }

  .nav-link {
    height: 60px !important;
    flex-direction: row !important;
  }

  .nav-link .v-icon {
    margin-bottom: 0;
    margin-right: 8px;
  }

  .contact-btn, .auth-btn {
    margin-top: 16px;
    width: 100%;
    margin-left: 0 !important;
  }
}

@media (max-width: 600px) {
  .company-name {
    font-size: 1.5rem !important;
    gap: 4px;
  }
  
  .company-tagline {
    font-size: 0.8rem;
  }
}

/* 添加闪光效果 */
@keyframes shine {
  0% {
    background-position: -100% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: -100% 50%;
  }
}

/* 更新闪光动画 */
@keyframes shine {
  0% {
    background-position: -100% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: -100% 50%;
  }
}

/* 页脚样式 */
.footer-section {
  position: relative;
  overflow: hidden;
}

.footer-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
}

.gold-text {
  color: #D4AF37 !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.social-btn {
  background: rgba(255,255,255,0.1) !important;
  transition: all 0.3s ease !important;
}

.facebook-btn:hover { background: #1877F2 !important; }
.instagram-btn:hover { background: #E4405F !important; }
.whatsapp-btn:hover { background: #25D366 !important; }
.telegram-btn:hover { background: #0088cc !important; }

.contact-item {
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-bottom: 8px;
}

.contact-item:hover {
  background: rgba(255,255,255,0.1) !important;
  transform: translateX(8px);
}

.quick-link-item {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.quick-link-item:hover {
  background: rgba(255,255,255,0.1) !important;
  padding-left: 8px;
}

.quick-link-item:hover .v-icon {
  transform: translateX(4px);
}

.footer-link {
  position: relative;
  transition: all 0.3s ease;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--v-accent-base);
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: var(--v-accent-base) !important;
}

.footer-link:hover::after {
  width: 100%;
}

.opacity-1 {
  opacity: 0.1;
}

@media (max-width: 960px) {
  .copyright-section {
    text-align: center;
  }
}

.contact-dialog {
  border-radius: 16px;
  overflow: hidden;
}

.contact-option {
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  background: #f5f5f5;
  margin-bottom: 12px;
}

.contact-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.contact-option .v-list-item__icon {
  margin: 16px;
}

.contact-option .v-icon {
  font-size: 28px;
}

.contact-option .v-list-item__subtitle {
  margin-top: 4px;
  opacity: 0.7;
}

.privacy-content {
  max-height: 70vh;
  overflow-y: auto;
  padding: 20px;
}

.privacy-content h3 {
  color: var(--v-primary-base);
}

.privacy-content ul {
  padding-left: 20px;
}

.privacy-content li {
  margin-bottom: 8px;
}

.privacy-content a {
  color: var(--v-primary-base);
  text-decoration: none;
}

.privacy-content a:hover {
  text-decoration: underline;
}
</style> 