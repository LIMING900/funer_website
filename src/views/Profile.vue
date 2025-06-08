<template>
  <div>
    <v-parallax
      :src="require('@/assets/background.jpg')"
      height="300"
      class="page-header"
    >
      <div class="overlay"></div>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold white--text mb-4 page-title">Profile</h1>
            <p class="text-h6 white--text subtitle-text">Update your contact information</p>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>

    <v-container class="profile-container mt-n10">
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-card class="profile-card" elevation="10">
            <v-card-title class="headline primary white--text">
              Profile Settings
            </v-card-title>
            
            <v-card-text class="pa-6">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profile.name"
                      label="Name"
                      :rules="nameRules"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profile.title"
                      label="Job Title"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profile.phone"
                      label="Phone"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profile.whatsapp"
                      label="WhatsApp"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profile.email"
                      label="Email"
                      :rules="emailRules"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profile.address"
                      label="Address"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-alert
                  v-if="error"
                  type="error"
                  dismissible
                  class="mt-4"
                >
                  {{ error }}
                </v-alert>
                
                <v-alert
                  v-if="success"
                  type="success"
                  dismissible
                  class="mt-4"
                >
                  {{ success }}
                </v-alert>
                
                <v-btn
                  color="primary"
                  large
                  class="mt-6"
                  :loading="loading"
                  :disabled="!valid"
                  @click="saveProfile"
                >
                  Save Profile
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data: () => ({
    valid: true,
    loading: false,
    error: null,
    success: null,
    profile: {
      name: '',
      title: '',
      phone: '',
      whatsapp: '',
      email: '',
      address: ''
    },
    nameRules: [
      v => !!v || '姓名不能为空'
    ],
    emailRules: [
      v => !!v || '邮箱不能为空',
      v => /.+@.+\..+/.test(v) || '请输入有效的邮箱地址'
    ]
  }),
  created() {
    // 检查用户是否已登录
    const userData = localStorage.getItem('user')
    if (!userData) {
      this.$router.push('/login')
      return
    }
    
    // 加载用户资料
    const user = JSON.parse(userData)
    this.profile = {
      name: user.name || '',
      title: user.title || '',
      phone: user.phone || '',
      whatsapp: user.whatsapp || '',
      email: user.email || '',
      address: user.address || ''
    }
  },
  methods: {
    async saveProfile() {
      if (!this.$refs.form.validate()) return
      
      this.loading = true
      this.error = null
      this.success = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 获取当前用户数据
        const userData = JSON.parse(localStorage.getItem('user'))
        
        // 更新用户资料
        const updatedUser = {
          ...userData,
          ...this.profile
        }
        
        // 保存到本地存储
        localStorage.setItem('user', JSON.stringify(updatedUser))
        
        // 触发全局事件，通知其他组件用户资料已更新
        this.$root.$emit('profile-updated', updatedUser)
        
        this.success = 'Profile updated successfully'
      } catch (error) {
        console.error('Failed to save profile:', error)
        this.error = 'Failed to save profile, please try again later'
      } finally {
        this.loading = false
      }
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

.profile-container {
  position: relative;
}

.profile-card {
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 960px) {
  .profile-container {
    margin-top: -60px;
  }
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

.overlay {
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)) !important;
}
</style> 