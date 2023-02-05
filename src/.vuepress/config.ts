import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Microcontrollers',
  description: 'Microcontrollers Course for VIVES University of Applied Sciences (Bachelor Degree)',

  theme: defaultTheme({
    logo: '',
    navbar: [],
    repo: 'sillevl/course-microcontrollers',
    docsDir: 'src',
    docsBranch: 'master',
    sidebarDepth: 1,

    sidebar: [
        {
            text: 'Introduction', link: '/README.md'
        },
        {
            text: 'Microcontrollers', link: '/01-microcontrollers/README.md'
        },
        {
            text: 'Programming', link: '/02-programming/README.md'
        },
        {
            text: 'Blinky',
            children: [
                { text: 'Blinky', link: '/03-blinky/README.md'},
                { text: 'Blinky improved', link: '/03-blinky/blinky-improved.md'},
                { text: 'mbed', link: '/03-blinky/mbed.md'},
            ]
        },
        {
            text: 'GPIO'
        },
        {
            text: 'UART'
        },
        {
            text: 'Interrupts'
        },
        {
            text: 'Timers'
        },
        {
            text: 'I²C'
        },
        {
            text: 'SPI'
        },
        {
            text: 'Analog to Digital'
        },
        {
            text: 'Digital to Analog'
        }
    ]
  })
})