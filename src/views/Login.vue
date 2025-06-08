<template>
  <div>
    <v-container class="auth-container fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="auth-card" elevation="10">
            <v-tabs v-model="activeTab" grow>
              <v-tab key="login">Login</v-tab>
              <v-tab key="register">Register</v-tab>
            </v-tabs>
            
            <v-tabs-items v-model="activeTab">
              <!-- 登录表单 -->
              <v-tab-item key="login">
                <v-card flat>
                  <v-card-text>
                    <v-form ref="loginForm" v-model="loginValid" lazy-validation>
                      <v-text-field
                        v-model="loginForm.username"
                        label="Username"
                        prepend-icon="mdi-account"
                        :rules="usernameRules"
                        required
                      ></v-text-field>
                      
                      <v-text-field
                        v-model="loginForm.password"
                        label="Password"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        :rules="passwordRules"
                        required
                      ></v-text-field>
                      
                      <v-alert
                        v-if="loginError"
                        type="error"
                        dismissible
                        class="mt-4"
                      >
                        {{ loginError }}
                      </v-alert>
                      
                      <div class="d-flex justify-space-between align-center mt-4">
                        <v-checkbox
                          v-model="rememberMe"
                          label="Remember me"
                          color="primary"
                          hide-details
                        ></v-checkbox>
                        <v-btn text color="primary">Forgot password?</v-btn>
                      </div>
                      
                      <v-btn
                        color="primary"
                        block
                        large
                        class="mt-4"
                        :loading="loginLoading"
                        :disabled="!loginValid"
                        @click="login"
                      >
                        Login
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              
              <!-- 注册表单 -->
              <v-tab-item key="register">
                <v-card flat>
                  <v-card-text>
                    <v-form ref="registerForm" v-model="registerValid" lazy-validation>
                      <v-text-field
                        v-model="registerForm.username"
                        label="Username"
                        prepend-icon="mdi-account"
                        :rules="usernameRules"
                        required
                      ></v-text-field>
                      
                      <v-text-field
                        v-model="registerForm.email"
                        label="Email"
                        prepend-icon="mdi-email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                      
                      <v-text-field
                        v-model="registerForm.password"
                        label="Password"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        :rules="passwordRules"
                        required
                      ></v-text-field>
                      
                      <v-text-field
                        v-model="registerForm.confirmPassword"
                        label="Confirm Password"
                        prepend-icon="mdi-lock-check"
                        :type="showPassword ? 'text' : 'password'"
                        :rules="[...passwordRules, passwordMatch]"
                        required
                      ></v-text-field>
                      
                      <v-alert
                        v-if="registerError"
                        type="error"
                        dismissible
                        class="mt-4"
                      >
                        {{ registerError }}
                      </v-alert>
                      
                      <v-btn
                        color="primary"
                        block
                        large
                        class="mt-4"
                        :loading="registerLoading"
                        :disabled="!registerValid"
                        @click="register"
                      >
                        Register
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
            
            <v-divider class="mt-4"></v-divider>
            
            <v-card-actions class="justify-center pa-4">
              <v-btn text color="primary" to="/">
                <v-icon left>mdi-home</v-icon>
                Back to Home
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    activeTab: 0,
    showPassword: false,
    rememberMe: false,
    
    // 登录表单
    loginValid: true,
    loginLoading: false,
    loginError: null,
    loginForm: {
      username: '',
      password: ''
    },
    
    // 注册表单
    registerValid: true,
    registerLoading: false,
    registerError: null,
    registerForm: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    
    // 验证规则
    usernameRules: [
      v => !!v || '用户名不能为空',
      v => v.length >= 3 || '用户名至少需要3个字符'
    ],
    passwordRules: [
      v => !!v || '密码不能为空',
      v => v.length >= 3 || '密码至少需要3个字符'
    ],
    emailRules: [
      v => !!v || '邮箱不能为空',
      v => /.+@.+\..+/.test(v) || '请输入有效的邮箱地址'
    ]
  }),
  computed: {
    passwordMatch() {
      return () => this.registerForm.password === this.registerForm.confirmPassword || '两次输入的密码不一致'
    }
  },
  methods: {
    async login() {
      if (!this.$refs.loginForm.validate()) return
      
      this.loginLoading = true
      this.loginError = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 简单验证 - 实际应用中应该使用后端验证
        if (this.loginForm.username === '123' && this.loginForm.password === '123') {
          // 保存用户信息到本地存储
          const userData = {
            id: 1,
            username: this.loginForm.username,
            name: 'Adrian Tan',
            title: 'Executive Director',
            phone: '+65 1234 5678',
            whatsapp: '+65 8765 4321',
            email: 'adrian@andycasket.com',
            address: 'Singapore'
          }
          
          localStorage.setItem('user', JSON.stringify(userData))
          
          // 触发全局登录成功事件
          this.$root.$emit('login-success', userData)
          
          // 跳转到首页
          this.$router.push('/')
        } else {
          this.loginError = 'Username or password is incorrect'
        }
      } catch (error) {
        console.error('Login failed:', error)
        this.loginError = 'Login failed, please try again later'
      } finally {
        this.loginLoading = false
      }
    },
    
    async register() {
      if (!this.$refs.registerForm.validate()) return
      
      this.registerLoading = true
      this.registerError = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 简单模拟注册 - 实际应用中应该使用后端API
        const userData = {
          id: 1,
          username: this.registerForm.username,
          email: this.registerForm.email,
          name: this.registerForm.username,
          title: 'Agent',
          phone: '',
          whatsapp: '',
          email: this.registerForm.email,
          address: 'Singapore'
        }
        
        localStorage.setItem('user', JSON.stringify(userData))
        
        // 触发全局登录成功事件
        this.$root.$emit('login-success', userData)
        
        // 跳转到个人资料页面
        this.$router.push('/profile')
      } catch (error) {
        console.error('Registration failed:', error)
        this.registerError = 'Registration failed, please try again later'
      } finally {
        this.registerLoading = false
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  min-height: calc(100vh - 200px);
}

.auth-card {
  border-radius: 16px;
  overflow: hidden;
}
</style> 