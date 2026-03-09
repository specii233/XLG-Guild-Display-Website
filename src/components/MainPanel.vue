<template>
    <div id="main-panel">
        <div id="menu-left" style="z-index: 100;">
            <img id="menu-logo" alt="" src="">
            <h2>Menu</h2>
            <ul>
                <li @click="navigateToHome">Home</li>
                <li @click="navigateToAbout">About</li>
                <li @click="navigateToContact">Contact</li>
                <li @click="navigateToMap">Map</li>
                <li @click="testFunc">Test</li>
            </ul>
        </div>

        <div id="content-right" style="z-index: 50;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainPanel',
    methods: {
        navigateToHome() {
            this.$router.push('/');
            // Implementation for navigating to home
        },
        navigateToAbout() {
            this.$router.push('/about');
            // Implementation for navigating to about
        },
        navigateToContact() {
            this.$router.push('/contact');
            // Implementation for navigating to contact
        },
        navigateToMap() {
            this.$router.push('/map');
            // Implementation for navigating to map
        },
        testFunc() {
            console.log('Test function called');
        }
    }
}
</script>

<style scoped>
#main-panel {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: var(--background-color);
}
#menu-left {
    width: 100px;
    height: 100%;
    left: 0;
    background-color: var(--background-color);
    box-shadow: 2px 0 5px var(--shadow-color);
}
#content-right {
    padding: 0;
    flex: 1;
    height: 100%;
    background-color: var(--background-color);
}
#menu-logo {
    width: 40px;
    height: 40px;
    margin: auto;
    margin-top: 10px;
}
li {
    padding: 10px;
    cursor: pointer;
    color: var(--text-color);
}
</style>