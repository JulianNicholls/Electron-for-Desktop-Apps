# Electron for Desktop Apps

This is the code from [Electron for Desktop Apps at Udemy](https://www.udemy.com/electron-react-tutorial/learn/v4/content)

## Differences from Stephen

I have split out javascript files from the HTML files in the first couple of apps. 
I have also added some minimal CSS to each app.

In the video info and converter apps, I have added more information about the video 
than just the duration.

### Tray App

I have updated some of the modules to the latest versions, including Electron.
I haven't updated React or Webpack, but I have had to adjust the Webpack / Babel 
configs. 

Also, I am running on Linux, so there are two problems:

* I have been forced to attach an explicit Context Menu to the icon because 
just responding to click only sort of works. By default, you get a context 
menu that gives the application name.

* I have used the module `electron-traywindow-positioner` to position the main 
window because `bounds` is not passed to a menu click, and calling 
`tray.getBounds()` returns 0 for both x and y, and also width and height. 

## Git client

I have used Git at the command-line for 10 years.
Over that time, I have tried many different graphical shells for Git,
without finding one that was easier and nicer to use than the command-line
(in my view).

I have now found that [GitKraken](https://www.gitkraken.com) is an excellent
Git shell and would advise using it to everyone.

## Questions

If you have any questions about this repository, or any others of mine, please
don't hesitate to contact me.
