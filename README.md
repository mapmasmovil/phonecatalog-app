# Phone catalog mobile app

![App working](http://g.recordit.co/SFWRSb34BV.gif)

Instead of creating a React app, I've created a react-native app, following the same principiles requested in the challenge. React and RN share a lot of apps and principles, and as I've been told that I would be working in react-native, I've thought it would be more interesting to resolve the test in this technology.

## Android install instructions

Following instructions will explain how to get the app running in Android. iOS hasn't been taken care of, just to keep things simpler. However it would be very easy to set it up too, not so easy to dockerize I'm afraid.

    docker-compose up

Takes time, I've copied a generic Dockerfile from https://github.com/MaximeD/docker-react-native that is used for development and it installs several dependencies, I've updated node version. Once finished react-native metro packager should launch. Then you can compile the app with:

    docker-compose run app react-native run-android

Once the app compiles and installs, Open the masmovil-app application in your phone or simulator and then enter in `Dev Settings > Debug server host & port device` (command+M or shake the phone) and enter `http://container-ip:8081`, after that reload javascript bundle.

## Set up API_URL

I haven't set up and inter container DNS or anything, to keep things simple, so you will have to point the app to your api container.

Inside `app/redux/createStore.js` you will find a variable `API_URL`, edit it with your phone catalog api container IP.

## Testing

You can run tests with:

    docker-compose run app yarn test

Some words about how I've tested this app. I've basically added the skeleton for testing redux in a functional way. You can read tons of articles online about how to unit test redux, which hasn't proved very useful to me. So I ended up recreating create store in my tests, this way I can dispatch real actions with their side effects and follow their results, which in my opinion produces less tests that better cover the code triggered.

I could add tests for the components themselves, react-native-test-utils is a good choice for this, and the reasoning behing would be making sure events are connected as expected, more than actually testing the rendering of a UI that can change frequently.

## Missing things and some comments

This is a basic skeleton project, many things are left to be done:

* No setup real production compilation with keystores
* No way to differ different development environments
* I've used ducks modular principle for redux, which reduces boilerplate and makes things easier https://github.com/erikras/ducks-modular-redux
* redux store hasn't be carefully crafted. I would usually format API data into a better structure for redux
* Howver redux-axios-middleware has been used as a centralized point for handling requests and reducing boilerplate.
* This is case is really simple, but if it would be a real app with some complexity, accessing to state directly wouldn't be a good idea, instead I would use re-select selectors
* No i18n sorry
* No navigation, only event handling and re-rendering
* Icons aren't SVG, I've kept it simple using an image instead of react-native-vector-icons
* I've had some issues with RN rendering, last versions are a little unstable, that's why I'm using dimensions in PhoneDetail component
* I'm not keeping all state in redux. In my opinion this sometimes becomes an overhead and make things complicated. Sometimes it's good to keep some UI state that is not shared in different parts of the app as local state.
* No time for end-to-end testing sorry. Apparently detox https://github.com/wix/detox only supports Android <= 0.51 and I started this project as 0.52. To be honest RN since 0.52 has started an internal refactoring process that has provoked several annoying bugs.
