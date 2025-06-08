<template>
  <div>
    <v-container class="py-8">
      <v-card class="terms-card">
        <v-card-title class="text-h4 primary--text">
          Terms of Service
          <v-spacer></v-spacer>
          <v-btn icon @click="$router.back()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="terms-content">
          <p class="text-subtitle-2 mb-6">Last Updated: 1 June 2023</p>

          <h2 class="text-h5 mb-4">1. Acceptance of Terms</h2>
          <p class="mb-6">By accessing or using Andy Casket Service's website (the "Site") and services, you agree to comply with these Terms of Service ("Terms"). If you do not agree, please refrain from using our Site.</p>

          <h2 class="text-h5 mb-4">2. Services Provided</h2>
          <p class="mb-2">We offer:</p>
          <ul class="mb-6">
            <li>Funeral arrangement services (burial, cremation, memorials).</li>
            <li>Documentation assistance (death certificates, permits).</li>
            <li>Related support (transportation, religious rites).</li>
          </ul>

          <h2 class="text-h5 mb-4">3. User Responsibilities</h2>
          <p class="mb-2">You agree to:</p>
          <ul class="mb-6">
            <li>Provide accurate and complete information.</li>
            <li>Comply with all applicable laws (e.g., Singapore's <strong>Funeral Services Act</strong>).</li>
            <li>Not misuse the Site (e.g., hacking, spamming).</li>
          </ul>

          <h2 class="text-h5 mb-4">4. Payments & Refunds</h2>
          <ul class="mb-6">
            <li>Fees for services will be clearly stated upfront.</li>
            <li>Payment is due as per agreed terms (e.g., deposit upon booking).</li>
            <li>Refunds are subject to our <strong>Cancellation Policy</strong>.</li>
          </ul>

          <h2 class="text-h5 mb-4">5. Limitation of Liability</h2>
          <ul class="mb-6">
            <li>We are not liable for delays/cancellations due to unforeseeable circumstances (e.g., natural disasters).</li>
            <li>Our liability is limited to the fees paid for the affected service.</li>
          </ul>

          <h2 class="text-h5 mb-4">6. Intellectual Property</h2>
          <p class="mb-6">All content (logos, text, images) on the Site is owned by Andy Casket Service and protected under copyright laws. Unauthorized use is prohibited.</p>

          <h2 class="text-h5 mb-4">7. Termination</h2>
          <p class="mb-6">We reserve the right to suspend or terminate access to the Site for violations of these Terms.</p>

          <h2 class="text-h5 mb-4">8. Governing Law</h2>
          <p class="mb-6">These Terms are governed by Singapore law. Disputes shall be resolved in Singapore courts.</p>

          <h2 class="text-h5 mb-4">9. Changes to Terms</h2>
          <p class="mb-6">We may update these Terms; continued use constitutes acceptance.</p>

          <v-divider class="my-6"></v-divider>

          <div class="company-info">
            <p><strong>Company Name:</strong> Andy Casket Service</p>
            <p><strong>Address:</strong> 29 Sin Ming Dr, Singapore</p>
            <p><strong>Email/Phone:</strong> +65 8800 5559</p>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'TermsOfService'
}
</script>

<style scoped>
.terms-card {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.terms-content {
  padding: 24px;
}

.terms-content h2 {
  color: var(--v-primary-base);
  font-weight: 600;
}

.terms-content ul {
  padding-left: 24px;
  margin-bottom: 16px;
}

.terms-content li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.terms-content a {
  color: var(--v-primary-base);
  text-decoration: none;
}

.terms-content a:hover {
  text-decoration: underline;
}

.company-info {
  background: rgba(0,0,0,0.02);
  padding: 16px;
  border-radius: 8px;
}

.company-info p {
  margin-bottom: 8px;
}

@media (max-width: 600px) {
  .terms-content {
    padding: 16px;
  }
}
</style> 