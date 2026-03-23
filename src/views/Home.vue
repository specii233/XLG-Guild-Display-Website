<!-- Home.vue -->
<template>
  <section id="top"></section>
  <div id="guildBar">
    <GuildBar :anchors="guildAnchors" />
  </div>
  <!-- 使用轮播组件 -->
  <Carousel :images="bannerImages" :autoplay="true" :interval="4000" />
  <h1>Home Page Content</h1>
  <!-- 其他内容 -->
  <section id="about">
    <h2>About Us</h2>
    <p>Welcome to our guild! We are a community of passionate gamers who love to explore new worlds and conquer
      challenges together.</p>
    <p>Join us for epic adventures and unforgettable moments!</p>
  </section>
  <section id="members">
    <MemberBar />
    <h2>Our Members</h2>
    <ul>
      <li>
        <Card title="Alice" content="A skilled warrior with a heart of gold." />
      </li>
      <li>
        <Card title="Bob" content="A master of magic and strategy." />
      </li>
      <li>
        <Card title="Charlie" content="A fearless explorer and treasure hunter." />
      </li>
      <li>
        <Card title="Diana" content="A healer who keeps the team alive in the toughest battles." />
      </li>
    </ul>
  </section>
  <section id="news">
    <h2>Latest News</h2>
    <ul>
      <li><strong>New Expansion Released:</strong> Explore the new lands and face powerful foes in our latest
        expansion!</li>
      <li><strong>Guild Events:</strong> Join us for weekly events, including raids, PvP tournaments, and social
        gatherings.</li>
      <li><strong>Community Spotlight:</strong> Check out our featured members and their incredible achievements!</li>
    </ul>
  </section>
  <section id="contact">
    <h2>Contact Us</h2>
    <p>Have questions or want to join our guild? Reach out to us through our social media channels or send us an email
      at <a href="mailto:info@xlguild.com">info@xlguild.com</a>.</p>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import GuildBar from '../components/GuildBar.vue';
import Carousel from '../components/Carousel.vue';
import Card from '../components/Card.vue';
import MemberDescription from '../components/MemberDescription.vue';
import MemberBar from '../components/MemberBar.vue';

const guildAnchors = ref([
  { name: 'Top', href: '#top' },
  { name: 'About', href: '#about' },
  { name: 'News', href: '#news' },
  { name: 'Contact', href: '#contact' }
]);

const bannerImages = ref([
  { src: 'https://picsum.photos/1200/400?random=1', alt: 'Beautiful landscape 1', title: 'Welcome', description: 'Discover amazing content' },
  { src: 'https://picsum.photos/1200/400?random=2', alt: 'Beautiful landscape 2', title: 'Latest News', description: 'Stay updated with our blog' },
  { src: 'https://picsum.photos/1200/400?random=3', alt: 'Beautiful landscape 3', title: 'Community', description: 'Join our growing community' },
  { src: 'https://picsum.photos/1200/400?random=4', alt: 'Beautiful landscape 4', title: 'Get Involved', description: 'Learn how to contribute' },
  { src: 'https://picsum.photos/1200/400?random=5', alt: 'Beautiful landscape 5', title: 'Contact Us', description: 'We would love to hear from you' }
]);

const updateBannerImages = () => {
  bannerImages.value.push({ src: 'https://picsum.photos/1200/400?random=6', alt: 'New image' });
};
</script>

<style scoped>
#guildBar {
  position: absolute;
  width: 100%;
  z-index: 1000;
}
</style>
