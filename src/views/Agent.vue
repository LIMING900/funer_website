<template>
  <div>
    <!-- 名片页面标题区 -->
    <v-parallax
      :src="require('@/assets/background.jpg') || 'https://picsum.photos/1920/1080?random=3'"
      height="300"
      class="page-header"
    >
      <div class="overlay"></div>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold white--text mb-4 page-title">Contact Us</h1>
            <p class="text-h6 white--text subtitle-text">Available 24/7 for your needs</p>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>

    <v-container class="namecard-container mt-n10">
      <v-row justify="center">
        <v-col cols="12" md="10">
          <!-- 用户未登录时显示登录提示 -->
          <v-card v-if="!user" class="login-prompt" elevation="10">
            <v-card-text class="text-center pa-12">
              <v-icon size="64" color="primary" class="mb-6">mdi-account-lock</v-icon>
              <h2 class="text-h4 mb-6">Please Login to View E-namecard</h2>
              <p class="text-body-1 mb-8">Login to view and share your electronic business card</p>
              <v-btn
                color="primary"
                x-large
                to="/login"
                class="px-12"
              >
                <v-icon left>mdi-login</v-icon>
                Login
              </v-btn>
            </v-card-text>
          </v-card>
          
          <!-- 用户已登录时显示名片 -->
          <v-card v-else class="namecard-wrapper" elevation="10">
            <v-row no-gutters>
              <!-- 左侧个人信息 -->
              <v-col cols="12" md="4" class="primary">
                <div class="profile-section pa-6 white--text">
                  <v-avatar size="180" class="mb-6 profile-avatar">
                    <v-icon size="120" color="white">mdi-account-circle</v-icon>
                  </v-avatar>
                  <h2 class="text-h4 font-weight-bold mb-2">{{ user.name }}</h2>
                  <p class="text-h6 mb-6">{{ user.title }}</p>
                  <v-divider dark class="mb-6"></v-divider>
                  <div class="contact-info">
                    <div class="mb-4">
                      <v-icon dark class="mr-3">mdi-phone</v-icon>
                      <span>{{ user.phone || 'Not set' }}</span>
                    </div>
                    <div class="mb-4">
                      <v-icon dark class="mr-3">mdi-whatsapp</v-icon>
                      <span>{{ user.whatsapp || 'Not set' }}</span>
                    </div>
                    <div class="mb-4">
                      <v-icon dark class="mr-3">mdi-email</v-icon>
                      <span>{{ user.email || 'Not set' }}</span>
                    </div>
                    <div class="mb-4">
                      <v-icon dark class="mr-3">mdi-map-marker</v-icon>
                      <span>{{ user.address || 'Not set' }}</span>
                    </div>
                  </div>
                </div>
              </v-col>

              <!-- 右侧联系表单 -->
              <v-col cols="12" md="8">
                <div class="contact-form pa-6">
                  <h3 class="text-h5 mb-6">Send us a message</h3>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="message.name"
                          label="Your Name"
                          :rules="nameRules"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="message.phone"
                          label="Phone Number"
                          :rules="phoneRules"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model="message.email"
                      label="Email Address"
                      :rules="emailRules"
                      outlined
                      dense
                    ></v-text-field>
                    <v-textarea
                      v-model="message.content"
                      label="Message"
                      :rules="messageRules"
                      outlined
                      rows="4"
                    ></v-textarea>
                    <v-btn
                      color="primary"
                      :loading="loading"
                      :disabled="!valid"
                      @click="submitMessage"
                      x-large
                      block
                      class="mt-4"
                    >
                      Send Message
                    </v-btn>
                  </v-form>
                </div>
              </v-col>
            </v-row>

            <!-- 分享按钮组 -->
            <v-card-actions class="share-actions pa-6 mt-4">
              <v-row justify="center" align="center">
                <v-col cols="auto">
                  <v-btn
                    color="primary"
                    class="share-btn mx-2"
                    @click="downloadVCard"
                    elevation="2"
                  >
                    <v-icon left>mdi-card-account-details</v-icon>
                    Save Contact
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    color="success"
                    class="share-btn mx-2"
                    @click="shareOnWhatsApp"
                    elevation="2"
                  >
                    <v-icon left>mdi-whatsapp</v-icon>
                    WhatsApp
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    color="accent"
                    class="share-btn mx-2"
                    @click="shareCard"
                    elevation="2"
                  >
                    <v-icon left>mdi-share-variant</v-icon>
                    Share
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- 分享对话框 -->
      <v-dialog v-model="shareDialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Share Contact Card</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item @click="copyLink">
                <v-list-item-icon>
                  <v-icon>mdi-content-copy</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Copy Direct Link</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="shareByEmail">
                <v-list-item-icon>
                  <v-icon>mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Share via Email</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="generateQRCode">
                <v-list-item-icon>
                  <v-icon>mdi-qrcode</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Show QR Code</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- QR码对话框 -->
      <v-dialog v-model="qrDialog" max-width="400">
        <v-card class="text-center pa-6">
          <v-card-title class="justify-center">Scan QR Code</v-card-title>
          <div class="qr-container my-4">
            <canvas ref="qrCanvas"></canvas>
          </div>
          <v-btn
            color="primary"
            @click="downloadQR"
            class="mt-4"
          >
            <v-icon left>mdi-download</v-icon>
            Save QR Code
          </v-btn>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
// import QRCode from 'qrcode'

export default {
  name: 'Agent',
  data: () => ({
    valid: true,
    loading: false,
    shareDialog: false,
    qrDialog: false,
    user: null,
    agent: {
      name: 'Adrian Tan',
      title: 'Executive Director',
      phone: '+65 1234 5678',
      whatsapp: '+65 8765 4321',
      email: 'adrian@andycasket.com',
      address: 'Singapore',
      contacts: [
        { icon: 'mdi-phone', value: '+65 1234 5678' },
        { icon: 'mdi-whatsapp', value: '+65 8765 4321' },
        { icon: 'mdi-email', value: 'adrian@andycasket.com' },
        { icon: 'mdi-map-marker', value: 'Singapore' }
      ]
    },
    message: {
      name: '',
      phone: '',
      email: '',
      content: ''
    },
    nameRules: [v => !!v || 'Name is required'],
    phoneRules: [v => !!v || 'Phone number is required'],
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid'
    ],
    messageRules: [v => !!v || 'Message is required'],
  }),
  created() {
    // 检查用户是否已登录
    const userData = localStorage.getItem('user')
    if (userData) {
      this.user = JSON.parse(userData)
    }
    
    // 监听用户注销事件
    this.$root.$on('user-logged-out', this.handleLogout)
  },
  beforeDestroy() {
    // 移除事件监听器
    this.$root.$off('user-logged-out', this.handleLogout)
  },
  methods: {
    async submitMessage() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          // 这里添加发送消息的逻辑
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.$refs.form.reset();
          alert('Message sent successfully!');
        } catch (error) {
          console.error('Error sending message:', error);
          alert('Failed to send message. Please try again.');
        } finally {
          this.loading = false;
        }
      }
    },
    generateVCard() {
      if (!this.user) return ''
      
      return `BEGIN:VCARD
VERSION:3.0
FN:${this.user.name}
TITLE:${this.user.title}
TEL;TYPE=WORK,VOICE:${this.user.phone}
TEL;TYPE=WORK,WHATSAPP:${this.user.whatsapp}
EMAIL;TYPE=WORK:${this.user.email}
ADR;TYPE=WORK:;;${this.user.address}
ORG:Andy Casket Service
URL:${window.location.origin}/agent
END:VCARD`
    },
    
    async downloadVCard() {
      const vcard = this.generateVCard()
      const blob = new Blob([vcard], { type: 'text/vcard' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${this.user.name}.vcf`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    shareOnWhatsApp() {
      const text = `Contact Card - ${this.user.name}\n${window.location.href}`
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`)
    },

    shareCard() {
      this.shareDialog = true
    },

    async copyLink() {
      try {
        await navigator.clipboard.writeText(window.location.href)
        this.$emit('show-message', 'Link copied to clipboard!')
        this.shareDialog = false
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    },

    shareByEmail() {
      const subject = `Contact Card - ${this.user.name}`
      const body = `Here's my contact information:\n\n${window.location.href}`
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      this.shareDialog = false
    },

    // async generateQRCode() {
    //   this.shareDialog = false
    //   this.qrDialog = true
    //   await this.$nextTick()
    //   const canvas = this.$refs.qrCanvas
    //   await QRCode.toCanvas(canvas, window.location.href, {
    //     width: 300,
    //     margin: 2,
    //     color: {
    //       dark: '#000000',
    //       light: '#ffffff'
    //     }
    //   })
    // },

    downloadQR() {
      const canvas = this.$refs.qrCanvas
      const link = document.createElement('a')
      link.download = `${this.user.name}-QR.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    },

    handleLogout() {
      this.user = null
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
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6));
}

.namecard-container {
  position: relative;
}

.namecard-wrapper {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.profile-section {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, var(--v-primary-base), var(--v-secondary-base));
}

.contact-info {
  width: 100%;
  text-align: left;
}

.contact-form {
  background: white;
  height: 100%;
}

.social-links {
  background: transparent;
}

@media (max-width: 960px) {
  .namecard-container {
    margin-top: -60px;
  }
  
  .profile-section {
    padding: 40px 20px;
  }
}

.profile-avatar {
  background: rgba(255, 255, 255, 0.1);
}

.share-actions {
  background: linear-gradient(to right, rgba(0,0,0,0.02), transparent);
  border-top: 1px solid rgba(0,0,0,0.05);
  display: flex;
  justify-content: center;
}

.share-btn {
  transition: all 0.3s ease;
  min-width: 150px;
}

.share-btn:hover {
  transform: translateY(-2px);
}

.qr-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

@media (max-width: 600px) {
  .share-actions .v-row {
    width: 100%;
  }
  
  .share-actions .v-col {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 4px 16px;
  }
  
  .share-btn {
    width: 100%;
    margin: 4px 0 !important;
  }
}

.login-prompt {
  border-radius: 16px;
  overflow: hidden;
  background: white;
  transition: all 0.3s ease;
}

.page-title {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  letter-spacing: 1px;
  font-size: 3.5rem !important;
  position: relative;
  display: inline-block;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--v-accent-base);
  border-radius: 2px;
}

.subtitle-text {
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
  letter-spacing: 0.5px;
  max-width: 600px;
  margin: 0 auto;
}
</style> 