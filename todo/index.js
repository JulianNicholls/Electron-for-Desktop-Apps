const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow, addWindow;

app.on('ready', () => {
  console.log('App is Ready.');

  mainWindow = new BrowserWindow({});

  mainWindow.loadURL(`file://${__dirname}/main.html`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('task:submit', (event, task) => {
  mainWindow.webContents.send('task:new', task);
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Task'
  });

  addWindow.loadURL(`file://${__dirname}/add.html`);
}

let menuTemplate = [
  {
    label: 'Tasks',
    submenu: [
      {
        label: 'New Task',
        accelerator: 'CmdOrCtrl+N',
        click() {
          createAddWindow();
        }
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  },
  // Re-enable edit keys
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  }
];

// On Mac, insert an empty menu item dropdown to use up the
// Electron menu
if (process.platform === 'darwin') {
  menuTemplate = [{ label: app.getName() }, ...menuTemplate];
}

// Add a view menu unless we're in production
if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'View',
    submenu: [{ role: 'reload' }, { role: 'toggledevtools' }]
  });
}
