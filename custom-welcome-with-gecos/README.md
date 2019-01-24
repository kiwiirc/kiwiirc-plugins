# Custom Startup for [Kiwi IRC] (https://kiwiirc.com)

Based off Welcome.vue  

This plugin creates a customised startup screen with real name (gecos) entry.
If network state is saved, nick and gecos fields will autofill with what the user previously used.

PR's welcome to https://github.com/TheBeerbarian/kiwiirc-plugins.git

Contact info: Cowan Bowman (cowan@beerbarian.com)


#### Dependencies
* node (https://nodejs.org/)
* yarn (https://yarnpkg.com/)

#### Building the source

```console
$ yarn
$ yarn build
```

The plugin will then be built into dist/plugin-welcome-startup-with-gecos.js

#### Configure kiwi client configuration to load the plugin.

```console
{
    "name": "welcomewithgecos",
    "url": "https://my.domain.com/path2kiwiplugins/plugin-welcome-startup-with-gecos.js"
}
```							

#### Configure kiwi client configuration to load startup screen.

```console
"startupScreen": "welcomewithgecos",
```

Two additional startupOptions may be added to kiwi client configuration.

Populate real name (gecos0 value with a default value.
```console
"gecos": "TestChat User",
```

Show the real name entry on the startup screen.
```console
"showGecos": true,
```

#### Kudos to ItsOnlyBinary for build template based off kiwiirc-plugin-custom-welcome-asl.

## License

[Licensed under the Apache License, Version 2.0](LICENSE).
