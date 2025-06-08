<template>
  <div>
    <v-container class="py-8">
      <v-card class="privacy-card">
        <v-card-title class="text-h4 primary--text">
          Privacy Policy
          <v-spacer></v-spacer>
          <v-btn icon @click="$router.back()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="privacy-content">
          <p class="text-subtitle-2 mb-6">Effective Date: 1 June 2023</p>

          <h2 class="text-h5 mb-4">1. Introduction</h2>
          <p class="mb-6">Andy Casket Service("we," "us," or "our") respects your privacy and is committed to protecting your personal data in compliance with Singapore's <strong>Personal Data Protection Act (PDPA)</strong>. This policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>

          <h2 class="text-h5 mb-4">2. Data We Collect</h2>
          <p class="mb-2">We may collect:</p>
          <ul class="mb-6">
            <li><strong>Personal details</strong> (name, NRIC/FIN if required, contact info).</li>
            <li><strong>Service-related data</strong> (deceased's information, death certificate, family details).</li>
            <li><strong>Payment details</strong> (credit card/bank account for transactions).</li>
            <li><strong>Technical data</strong> (IP address, cookies, browsing behavior).</li>
          </ul>

          <h2 class="text-h5 mb-4">3. Purpose of Collection</h2>
          <p class="mb-2">Your data is used to:</p>
          <ul class="mb-6">
            <li>Provide funeral/cremation services.</li>
            <li>Process payments and documentation.</li>
            <li>Respond to inquiries or requests.</li>
            <li>Comply with legal obligations (e.g., death registration).</li>
          </ul>

          <h2 class="text-h5 mb-4">4. Data Sharing</h2>
          <p class="mb-2">We only disclose information to:</p>
          <ul class="mb-6">
            <li><strong>Service partners</strong> (hospitals, crematoriums, religious institutions).</li>
            <li><strong>Legal authorities</strong> (if required by law).</li>
            <li><strong>Trusted vendors</strong> (IT/payment processors under confidentiality agreements).</li>
          </ul>

          <h2 class="text-h5 mb-4">5. Cookies & Tracking</h2>
          <p class="mb-6">We use cookies to improve website functionality. You may disable cookies via browser settings, but some features may be affected.</p>

          <h2 class="text-h5 mb-4">6. Data Security & Retention</h2>
          <ul class="mb-6">
            <li>Data is secured via encryption and access controls.</li>
            <li>Retained only as long as necessary (per legal/business needs).</li>
          </ul>

          <h2 class="text-h5 mb-4">7. Your Rights</h2>
          <p class="mb-2">Under PDPA, you may:</p>
          <ul class="mb-6">
            <li>Access or correct your data.</li>
            <li>Withdraw consent (may affect services).</li>
            <li>Lodge complaints with Singapore's <strong>PDPC</strong> (<a href="https://www.pdpc.gov.sg" target="_blank">pdpc.gov.sg</a>).</li>
          </ul>

          <h2 class="text-h5 mb-4">8. Updates</h2>
          <p class="mb-6">We may update this policy; changes will be posted here.</p>

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
  name: 'PrivacyPolicy'
}
</script>

<style scoped>
.privacy-card {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.privacy-content {
  padding: 24px;
}

.privacy-content h2 {
  color: var(--v-primary-base);
  font-weight: 600;
}

.privacy-content ul {
  padding-left: 24px;
  margin-bottom: 16px;
}

.privacy-content li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.privacy-content a {
  color: var(--v-primary-base);
  text-decoration: none;
}

.privacy-content a:hover {
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
  .privacy-content {
    padding: 16px;
  }
}
</style> 