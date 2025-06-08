<template>
  <div>
    <!-- 全宽度的英雄区域 -->
    <v-parallax
      :src="require('@/assets/companyTitle.jpg')"
      height="600"
      class="hero-section"
    >
      <div class="hero-overlay"></div>
      <v-container class="hero-content">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold white--text mb-4">
              Professional Funeral Services
            </h1>
            <p class="text-h6 white--text mb-8">
              Providing dignified and compassionate funeral services 24/7
            </p>
            <v-btn
              x-large
              color="accent"
              class="mr-4"
              elevation="4"
              rounded
            >
              Our Services
            </v-btn>
            <v-btn
              x-large
              outlined
              color="white"
              class="hero-btn"
              rounded
            >
              Contact Us
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>

    <!-- 服务特点部分 -->
    <v-container class="features-section mt-n15">
      <v-row>
        <v-col cols="12" md="4" v-for="(feature, i) in features" :key="i">
          <v-hover v-slot="{ hover }">
            <v-card
              class="feature-card mx-auto"
              :elevation="hover ? 12 : 4"
              :class="{ 'on-hover': hover }"
            >
              <v-card-text class="text-center pa-6">
                <v-icon size="48" color="accent" class="mb-4">{{ feature.icon }}</v-icon>
                <h3 class="text-h5 font-weight-bold mb-4">{{ feature.title }}</h3>
                <p class="text-body-1">{{ feature.description }}</p>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>

    <!-- 关于我们部分 -->
    <v-container class="about-section py-12">
      <v-row align="center">
        <v-col cols="12" md="6">
          <div class="about-content pr-md-8">
            <h2 class="text-h3 font-weight-bold mb-6">About Us</h2>
            <p class="text-body-1 mb-6">
              We offer affordable caskets, urns, hearses, and transportation, as well as obituary and tentage/parlour services. Our team is available 24/7 to cater to your needs during this difficult time.
            </p>
            <v-row class="mt-6">
              <v-col cols="6" v-for="(stat, i) in stats" :key="i">
                <div class="stat-item">
                  <div class="text-h3 font-weight-bold accent--text">{{ stat.value }}</div>
                  <div class="text-subtitle-1">{{ stat.label }}</div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="consultation-form pa-6" elevation="10">
            <v-card-title class="text-h4 mb-6">Online Consultation</v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="consultation.firstName"
                    label="First Name"
                    required
                    outlined
                    dense
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="consultation.lastName"
                    label="Last Name"
                    required
                    outlined
                    dense
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="consultation.contact"
                label="Contact Number"
                required
                outlined
                dense
                :rules="phoneRules"
              ></v-text-field>
              <v-text-field
                v-model="consultation.email"
                label="Email"
                required
                outlined
                dense
                :rules="emailRules"
              ></v-text-field>
              <v-select
                v-model="consultation.service"
                :items="serviceTypes"
                label="Type of Service"
                required
                outlined
                dense
                :rules="[(v) => !!v || 'Service type is required']"
              ></v-select>
              <v-textarea
                v-model="consultation.message"
                label="Additional Message (Optional)"
                outlined
                dense
                rows="3"
              ></v-textarea>
              <v-btn
                color="primary"
                block
                large
                :loading="loading"
                :disabled="!valid"
                @click="submitConsultation"
                height="50"
                class="mt-4"
              >
                Request Consultation
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 服务流程部分 -->
    <v-container fluid class="process-section py-16 grey lighten-4">
      <v-container>
        <v-row justify="center" class="mb-12">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-6">How We Work</h2>
            <p class="text-body-1">Simple steps to arrange a dignified farewell for your loved ones</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" v-for="(step, i) in processSteps" :key="i">
            <div class="process-step text-center">
              <div class="step-number mb-4">{{ i + 1 }}</div>
              <h3 class="text-h5 font-weight-bold mb-4">{{ step.title }}</h3>
              <p class="text-body-2">{{ step.description }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    valid: true,
    loading: false,
    features: [
      {
        icon: 'mdi-clock-outline',
        title: '24/7 Service',
        description: 'Available round the clock to assist you in your time of need'
      },
      {
        icon: 'mdi-heart-outline',
        title: 'Compassionate Care',
        description: 'Professional and empathetic service for your loved ones'
      },
      {
        icon: 'mdi-cash-multiple',
        title: 'Affordable Packages',
        description: 'Comprehensive funeral services at reasonable prices'
      }
    ],
    stats: [
      { value: '15+', label: 'Years Experience' },
      { value: '1000+', label: 'Families Served' },
      { value: '24/7', label: 'Support Available' },
      { value: '100%', label: 'Satisfaction Rate' }
    ],
    processSteps: [
      {
        title: 'Initial Contact',
        description: 'Reach out to us through phone or online consultation'
      },
      {
        title: 'Choose Package',
        description: 'Select from our range of customizable funeral packages'
      },
      {
        title: 'Arrangement',
        description: 'We handle all the necessary funeral arrangements'
      },
      {
        title: 'Service',
        description: 'Dignified and respectful funeral service execution'
      }
    ],
    consultation: {
      firstName: '',
      lastName: '',
      contact: '',
      email: '',
      service: '',
      message: ''
    },
    serviceTypes: [
      'Casket Services',
      'Urns',
      'Hearse Transportation',
      'Obituary Services',
      'Tentage/Parlour Services',
      'Other Services'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    nameRules: [
      v => !!v || 'Name is required'
    ],
    phoneRules: [
      v => !!v || 'Phone number is required'
    ]
  }),
  methods: {
    async submitConsultation() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          // 这里添加发送咨询请求的逻辑
          console.log('Consultation submitted:', this.consultation);
          // 模拟API调用
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.$refs.form.reset();
          // 显示成功消息
          alert('Consultation request sent successfully!');
        } catch (error) {
          console.error('Error submitting consultation:', error);
          alert('Failed to send consultation request. Please try again.');
        } finally {
          this.loading = false;
        }
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6));
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-btn {
  backdrop-filter: blur(4px);
  background: rgba(255,255,255,0.1);
}

.features-section {
  position: relative;
  z-index: 2;
}

.feature-card {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 16px;
}

.feature-card.on-hover {
  transform: translateY(-8px);
}

.about-section {
  position: relative;
  overflow: hidden;
}

.stat-item {
  padding: 20px;
  background: rgba(212,175,55,0.1);
  border-radius: 12px;
  text-align: center;
}

.consultation-form {
  border-radius: 16px;
  background: linear-gradient(145deg, #ffffff, #f5f7fa);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.process-section {
  position: relative;
}

.process-step {
  position: relative;
  padding: 20px;
}

.step-number {
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  background: var(--v-accent-base);
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto;
}

.process-step::after {
  content: '';
  position: absolute;
  top: 40px;
  right: -50%;
  width: 100%;
  height: 2px;
  background: var(--v-accent-base);
  opacity: 0.3;
}

.process-step:last-child::after {
  display: none;
}

@media (max-width: 960px) {
  .process-step::after {
    display: none;
  }
  
  .stat-item {
    margin-bottom: 16px;
  }
}
</style> 