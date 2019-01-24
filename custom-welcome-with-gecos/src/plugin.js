import WelcomeWithGecos from './components/WelcomeWithGecos.vue';

// eslint-disable-next-line no-undef
kiwi.plugin('welcomewithgecos', (kiwi) => {
    kiwi.addStartup('welcomewithgecos', WelcomeWithGecos);
});
