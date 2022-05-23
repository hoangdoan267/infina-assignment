# Infina Code Chanllenge

An Entrance Coding Challenge from Infiina

[![GitHub issues](https://img.shields.io/github/issues/hoangdoan267/infina-assignment)](https://github.com/hoangdoan267/AspireTest/issues)
![GitHub last commit](https://img.shields.io/github/last-commit/hoangdoan267/infina-assignment)

## Table of contents
  - [1. User Stories](#1-user-stories)
  - [2. Installation](#2-installation)
  - [3. Usage](#3-usage)
  - [3. Use Deep Linking](#3-use-deep-linking)
      - [iOS](#ios)
      - [Android](#android)
### 1. User Stories

- [x] As an User, I want to see list of countries in Home Screen
- [x] As an User, I want to see Country Data when tap in counntry flag
- [x] As an User, I want to see Continent Data when tap continent in Country Screen
- [x] As an User, I want see list of countries of Continent in Continent Screen, and see country data when tap in country flag
- [x] As an User, I want to see Country screen when visits `rnhw://country/:code`
- [x] As an User, I want to see Continent screen when visits `rnhw://continent/:code`

### 2. Installation
To use this project, follow these steps below:

1. Clone the project: `$ git clone https://github.com/hoangdoan267/infina-assignment.git` 
2. Run: `$ yarn` to install all dependencies
3. For ios, you have to link native modules using Pod
`$ cd ios/ && pod install` or `$ npx pod-install`
4. Run `$ yarn codegen` to generate code from GraphQL schema
### 3. Usage

Running on iOS
`$ npx react-native run-ios`

![iOS](https://i.imgur.com/VRjYnQB.png)

Running on Android
`$ npx react-native run-android`

![Android](https://i.imgur.com/dpBAxoN.png[/img)
### 3. Use Deep Linking
##### iOS
1. Use Safari: open Safari and enter your link, for example: `rnhw://country/VN`
2. Use Terminal: Run `npx uri-scheme open "rnhw://country/VN" --ios`

##### Android
1. Use Terminal: Run `npx uri-scheme open "rnhw://country/VN" --android`

[(Back to top)](#table-of-contents)










