<template>
  <div>
    <!-- 页面标题区 -->
    <v-parallax
      :src="require('@/assets/background.jpg')"
      height="300"
      class="page-header"
    >
      <div class="overlay"></div>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold white--text mb-4 page-title">Sample Display</h1>
            <p class="text-h6 white--text subtitle-text">Browse our collection of caskets and services</p>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>

    <v-container class="gallery-container mt-n10">
      <!-- 筛选器 -->
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-card class="filter-card mb-8" elevation="4">
            <v-card-text class="py-4">
              <v-row align="center" justify="space-between">
                <v-col cols="12" sm="8" md="6">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Search gallery"
                    outlined
                    dense
                    hide-details
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-select
                    v-model="category"
                    :items="categories"
                    label="Category"
                    outlined
                    dense
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 图片网格 -->
      <v-row>
        <v-col v-for="(image, index) in filteredImages" 
               :key="index" 
               cols="12" sm="6" md="4" lg="3"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              class="gallery-card mx-auto"
              :elevation="hover ? 12 : 2"
              @click="showImage(image)"
            >
              <v-img
                :src="image.thumbnail"
                :aspect-ratio="4/3"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <v-card-title class="text-subtitle-1">{{ image.description }}</v-card-title>
              </v-img>
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="primary"
                >
                  <v-btn
                    icon
                    large
                    color="white"
                  >
                    <v-icon large>mdi-magnify-plus</v-icon>
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <!-- 加载更多按钮 -->
      <v-row class="mt-6" v-if="hasMore">
        <v-col cols="12" class="text-center">
          <v-btn
            color="primary"
            outlined
            :loading="loading"
            @click="loadMore"
          >
            Load More
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- 图片查看器 -->
    <v-dialog
      v-model="dialog"
      max-width="900"
    >
      <v-card class="image-viewer">
        <v-img
          v-if="selectedImage"
          :src="selectedImage.full"
          max-height="80vh"
          contain
        ></v-img>
        <v-card-actions class="justify-end">
          <v-btn
            icon
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'Gallery',
  data: () => ({
    search: '',
    category: 'All',
    categories: ['All', 'Caskets', 'Urns', 'Services', 'Facilities'],
    loading: false,
    dialog: false,
    selectedImage: null,
    page: 1,
    hasMore: true,
    images: [
      {
        thumbnail: require('@/assets/funer1.jpg'),
        full: require('@/assets/funer1.jpg'),
        description: 'Premium Casket Display',
        category: 'Caskets'
      },
      {
        thumbnail: require('@/assets/funer2.jpg'),
        full: require('@/assets/funer2.jpg'),
        description: 'Memorial Service Setup',
        category: 'Services'
      },
      // ... 添加更多图片
    ]
  }),
  computed: {
    filteredImages() {
      return this.images.filter(image => {
        const matchesSearch = image.description.toLowerCase().includes(this.search.toLowerCase());
        const matchesCategory = this.category === 'All' || image.category === this.category;
        return matchesSearch && matchesCategory;
      });
    }
  },
  methods: {
    showImage(image) {
      this.selectedImage = image;
      this.dialog = true;
    },
    async loadMore() {
      this.loading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // 这里添加加载更多图片的逻辑
        this.hasMore = false;
      } catch (error) {
        console.error('Error loading more images:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchImages() {
      try {
        const response = await api.getGallery();
        if (response.data) {
          this.images = response.data;
        }
      } catch (error) {
        console.error('获取图片失败:', error);
      }
    }
  },
  created() {
    // 暂时注释掉API调用，等后端准备好再启用
    // this.fetchImages();
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

.gallery-container {
  position: relative;
}

.filter-card {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.98);
}

.gallery-card {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery-card:hover {
  transform: translateY(-4px);
}

.image-viewer {
  background: transparent;
  overflow: hidden;
}

.v-card__actions {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
}

@media (max-width: 960px) {
  .gallery-container {
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
</style> 