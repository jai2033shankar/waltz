# Settings

## Presentation

* ```ui.logo.overlay.text``` - optional text to overlay on the logo, keep it short
* ```ui.logo.overlay.color``` - colour used to render the optional overlay on the logo
* ```ui.inactivity-timeout``` - time in miliseconds of inactivity before the UI triggers a page refresh, disabled if not provided

Use these settings to let users know if they are on a beta instance. 

* ```web.beta``` - is this instance of waltz running beta code (```true | false```)
* ```web.beta.nag-message``` - the message to display if non-beta user on a beta environment


## Security

Group of settings which control how waltz handles authentication/authorization

* ```web.authentication```
  * ```waltz``` - indicates that waltz is handling authentication, the login panel will be displayed
  * ```sso``` - authentication is done elsewhere, do not show the login panel
* ```server.authentication.filter```
  * ```<classname>``` - the name of the class which injects the user object into incoming requests.
    By default this is ```com.khartec.waltz.web.endpoints.auth.JWTAuthenticationFilter```
  * ```com.khartec.waltz.web.endpoints.auth.HeaderBasedAuthenticationFilter```
  * ```com.khartec.waltz.web.endpoints.auth.JWTAuthenticationFilter```
* ```server.authentication.roles.default``` - Default set of role names (comma sep)


## Development (```web.devext``` )

Development options can be used by developers to aid in writing code for Waltz

* ```web.devext.enabled``` - master switch, if enabled other settings in this group will be activated
* ```web.devext.http.header.*``` - values in this group will be added to the header of
    all $http calls (primarily api calls)


## Features (```feature.*```)

Features can be enabled/disabled and configured via settings.  Currently available options are:

* ```feature.software-catalog.enabled```
    * (```true|false```) display software-catalog (technology sections)


## Defaults

General default settings

* ```server.data-type.default-code```
    * (```UNKNOWN```) UNKNOWN is the code for the default data type
* ```server.gzip.enabled```
    * (```true|false```) enable or disable gzipping of content
* ```server.gzip.minimum-size```
    * (```8192```) the size of the response before gzip is enabled