<template>
  <div>
    <div class="row row-full footer-placeholder"></div>
    <div class="row row-full footer">
      <div class="gr-4">
        <div class="footer__right-border">
          <router-link :to="{ name: 'coins' }">
            <div class="footer__title">Coins</div>
            <div class="footer__content">
              <div class="footer__content-digits">
                $10,000 BTC
              </diV>
            </div>
          </router-link>
        </div>
      </div>
      <div class="gr-4">
        <router-link :to="{ name: 'portfolio' }">
          <div class="footer__title">Portfolio</div>
          <div class="footer__content">
            <div class="footer__content-digits">
              $10,000
            </div>
          </div>
          </router-link>
        </div>
        <div class="gr-4">
          <router-link :to="{ name: 'coins' }">
            <div class="footer__left-border">
              <div class="footer__title">My account</div>
              <div class="footer__content">You are not logged-in</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
