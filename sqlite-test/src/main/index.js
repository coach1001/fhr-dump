'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import sqlite3 from 'sqlite3'
import PDFDocument from 'pdfkit'
import fs from 'fs'
import PDFWindow from 'electron-pdf-window'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let state = 'IDLE'
let machineState =

function setIdleState() {

}

function setZeroState() {

}

function setUpState() {

}

function setDownState() {

}

function setReverseState() {

}

function setApproachState() {

}

function setTestState() {

}

void pressStateMachine_r() {

  if (state === 'IDLE') {

  } else if (state === 'ZERO') {

  } else if (state === 'UP') {

  } else if (state === 'DOWN') {

  } else if (state === 'REVERSE') {

  } else if (state === 'APPROACH') {

  } else if (state === 'TEST') {

  }

}

ipcMain.on('get-genres', (evt, args) => {
  evt.sender.send('post-genres', genres)
})

let mainWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let db = new sqlite3.Database(`${__static}/chinook.db`)
let genres = []

function createPDF (evt) {
  let doc = new PDFDocument({
    size: 'a4'
  })
  let stream = doc.pipe(fs.createWriteStream(`${__static}/output.pdf`))
  doc.fontSize(15).text('Wally Gator !', 50, 50)
  doc.end()
  stream.on('finish', () => {
    evt.sender.send('created-pdf')
    const win = new PDFWindow({
      width: 800,
      height: 600
    })
    win.loadURL(`${__static}/output.pdf`)
  })
}

ipcMain.on('create-pdf', (evt, args) => {
  createPDF(evt)
})

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  db.serialize(() => {
    db.each('SELECT * FROM genres', (err, row) => {
      if (err) {
        console.log(err)
      } else {
        genres.push(row)
      }
    })
  })

  db.close((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('DB Closed Successfully')
      mainWindow.loadURL(winURL)
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
