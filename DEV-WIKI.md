# Table of contents <!-- omit in toc -->
- [❓ Getting started](#-getting-started)
  - [Install VSCode](#install-vscode)
  - [Install Git](#install-git)
  - [Install Node.js via NVM](#install-nodejs-via-nvm)
  - [Install recommended VSCode extensions](#install-recommended-vscode-extensions)
  - [Clone the repository](#clone-the-repository)
- [🧪 Testing the site](#-testing-the-site)
- [✍🏻 Committing changes](#-committing-changes)
- [📂 Understanding the repository structure](#-understanding-the-repository-structure)
- [🧠 Understanding the framework](#-understanding-the-framework)
  - [🚲 Life cycle of a build](#-life-cycle-of-a-build)
  - [Naming conventions](#naming-conventions)
- [📝 Writing content for the site](#-writing-content-for-the-site)
  - [Adding a new page](#adding-a-new-page)
    - [Using the markdown populator](#using-the-markdown-populator)
  - [Using the HTML frame populator](#using-the-html-frame-populator)
  - [Using the HTML full replacer](#using-the-html-full-replacer)
  - [Making changes to an existing page](#making-changes-to-an-existing-page)
  - [Updating `pageConfig.jsonc`](#updating-pageconfigjsonc)
    - [Adding a new entry](#adding-a-new-entry)
  - [Shortcut](#shortcut)
- [✨ Working on the frontend](#-working-on-the-frontend)
- [🖼️ Working on the framework](#️-working-on-the-framework)
  - [`PageData`](#pagedata)
- [📖 Glossary](#-glossary)
  - [Content population](#content-population)
  - [CSS embeds](#css-embeds)
  - [`pageConfig.jsonc`](#pageconfigjsonc)
  - [Populator](#populator)
  - [Post-paint TS](#post-paint-ts)
  - [Post-population TS](#post-population-ts)
  - [Runtime JS](#runtime-js)
  - [Template](#template)
  - [Template compilation](#template-compilation)
  - [Template painting](#template-painting)
  - [TS includes](#ts-includes)


# 🔍 Developer Wiki <!-- omit in toc -->
This bare-bones wiki contains information for developers working on the site. If you are not sure how something works, please don't hesitate to ask!  

**To get yourself familiarised, you are recommended to follow one of the tracks depending on what you are trying to do.**  
You can use the [glossary](#-glossary) to understand the terms used in this wiki.  

### I just want to write content wtf is this:
<!-- no toc -->
0. [Shortcut](#shortcut)
1. [Getting started](#-getting-started)
2. [Testing the site](#testing-the-site)
3. [Committing changes](#committing-changes)
4. [Writing content for the site](#-writing-content-for-the-site)

### I am just getting started:  
<!-- no toc -->
1. [Getting started](#-getting-started)
2. [Testing the site](#testing-the-site)
3. [Committing changes](#committing-changes)
4. [Understanding the repository structure](#-understanding-the-repository-structure)

### I want to work on the frontend:  
<!-- no toc -->
1. [Understanding the repository structure](#-understanding-the-repository-structure)
2. [Understanding the framework](#-understanding-the-framework)
3. [Working on the frontend](#-working-on-the-frontend)

### I want to work on the framework:  
<!-- no toc -->
1. [Understanding the repository structure](#-understanding-the-repository-structure)
2. [Understanding the framework](#-understanding-the-framework)
3. [Working on the framework](#️-working-on-the-framework)

# ❓ Getting started

## Install VSCode  
> 1. Install VSCode from https://code.visualstudio.com/ following the default installation instructions

## Install Git  
> 1. Install Git from https://git-scm.com/ following the default installation instructions

## Install Node.js via NVM  
> 1. Download and run `nvm-setup.exe` NVM from https://github.com/coreybutler/nvm-windows/releases following default installation instructions
> 2. Launch VSCode
> 3. Open the terminal with `Ctrl` + `` ` `` (backtick)
> 4. Run `nvm list available` to see the available versions of Node.js, remember the latest LTS version number (e.g. `20.15.0`)
> 5. Run `nvm install <LTS Version>` to install the latest LTS version of Node.js (e.g. `nvm install 20.15.0`)
> 6. Run `nvm use <LTS Version>` to switch to the installed version of Node.js (e.g. `nvm use 20.15.0`)
> 7. Run `node --version` to check that Node.js has been installed correctly, you should see the version number

## Install recommended VSCode extensions  
> It is recommended to install the following extensions for VSCode:  
> - `GitHub.vscode-pull-request-github` for easier pull request management
> - `ritwickdey.LiveServer` for live previewing of the site
> 
> 1. Open the extensions sidebar with `Ctrl` + `Shift` + `X`  
> 2. Search for the extension ID and click install  

## Clone the repository  
> 1. In file explorer, create a new folder for the repository
> 2. Right-click the folder and select `Git Bash Here`
> 3. Run `git clone https://github.com/ResiSense/ResiSense.github.io.git` to clone the repository
> 4. Close the Git Bash terminal
> 5. In file explorer, navigate to the cloned repository folder `ResiSense.github.io`
> 6. Right-click the folder and select `Open with Code` to open the repository in VSCode
> 7. Open the terminal with `Ctrl` + `` ` `` (backtick)
> 8. Run `npm install` to install the required dependencies

# 🧪 Testing the site
1. Open the terminal with `Ctrl` + `` ` `` (backtick)
2. Run `npm run dev-build` to build the site for testing, you should find a new `test` folder in the repository
3. In file explorer, navigate to the `test` folder
4. Right-click the folder and select `Open with Code` to open the test site in another VSCode window
5. Open the command palette with `Ctrl` + `Shift` + `P`
6. Search for `Live Server: Open with Live Server` and select it to open the test site in your browser

The test site should now be running in your browser.  
**Please note that `.../<page>` does not automatically serve `.../<page>.html` and you will see an error. Please manually append `.html` to the URL. This issue only affect the test site and not the live site.**  
Live reloading should be enabled so that changes to the source code are automatically reflected in the browser after running `npm run dev-build`. You can also refresh manually if live reloading fails.  
Note that the `test` folder is not tracked by Git and can be deleted or modified at any time without consequence.  

# ✍🏻 Committing changes
0. You are recommended to read up on the basics of Git and GitHub if you are not familiar with them
1. Open the source control sidebar with `Ctrl` + `Shift` + `G`
2. Sign in to your GitHub account as necessary
3. Stage the changes by clicking the `+` button next to each file name
4. Write a commit message in the text box at the top of the sidebar to describe the changes
5. Click `Commit & Create Pull Request`; you can find this button under the dropdown menu next to the commit button if it is not already visible
6. Follow the instructions in the new browser window to create a pull request
7. Wait for the pull request to be reviewed and merged by the repository owner

Feel free to make changes here as a test if you wish. (This file is `/DEV-WIKI.md` btw.)
```markdown
Sign here if you read this:
- CCheukKa was here.
```

# 📂 Understanding the repository structure
| Folder       | Description                               | Content                 | Remarks                             |
| :----------- | :---------------------------------------- | :---------------------- | :---------------------------------- |
| `test/`      | Test build of the site                    |                         | Untracked, sandbox to test stuff in |
| `pages/`     | Content of the site                       | `.md` and `.html` files |                                     |
| `assets/`    | Assets used in the site                   | predominantly images    | **is cloned to `docs/`**            |
| `scripts/`   | JS scripts to be packaged to clients      | `.js` files             | **is cloned to `docs/`**            |
| `styles/`    | CSS stylesheets to be packaged to clients | `.css` files            | **is cloned to `docs/`**            |
| `meta/`      | Metadata for the site                     |                         |                                     |
| `templates/` | HTML templates for the site               | `.html` files           |                                     |
| `lib/`       | Framework code                            | `.ts` files             |                                     |
| `.github/`   | GitHub essential files                    | templates and actions   | *edit with caution*                 |
| `docs/`      | Production build of the site              |                         | ***DO NOT TOUCH***                  |

| Important files                                   | What's this?                                | Remarks                           |
| :------------------------------------------------ | :------------------------------------------ | :-------------------------------- |
| [`README.md`](/README.md)                         | Repository information                      |                                   |
| [`DEV-WIKI.md`](/DEV-WIKI.md)                     | Developer wiki                              |                                   |
| [`meta/pageConfig.jsonc`](/meta/pageConfig.jsonc) | Metadata for pages; ***VERY IMPORTANT!***   | See [this](#pageconfigjsonc)      |
| [`siteBuilder.ts`](/siteBuilder.ts)               | Framework code entry point                  |                                   |
| [`boiler-plate.html`](/boiler-plate.html)         | Boilerplate HTML template for site builders |                                   |
| [`index.html`](/index.html)                       | Entry point of the site                     | *edit with caution*               |
| [`.gitignore`](/.gitignore)                       | Files and folders to be ignored by Git      | *edit with caution*               |
| [`tsconfig.json`](/tsconfig.json)                 | TypeScript configuration                    | *edit with caution*               |
| [`package.json`](/package.json)                   | Node.js package configuration               | *edit with caution*               |
| [`package-lock.json`](/package-lock.json)         | Node.js dependencies                        | *not recommended to edit by hand* |

# 🧠 Understanding the framework
This is a very stripped-down and very custom framework specifically designed for the ResiSense website.  
The framework is how the site is built and how the content is displayed.  
You can refer to the [glossary](#-glossary) as necessary.

## 🚲 Life cycle of a build
0. `siteBuilder.ts` is run, via `npm run dev-build` (manual testing) or `npm run prod-build` (auto on push)
1. `assets/`, `scripts/`, and `styles/` are copied to `docs/`
2. The templates in `templates/` are [compiled](#template-compilation) recursively and cached
3. For each page described in [`meta/pageConfig.jsonc`](#️-pageconfigjsonc):
   1. Templates are embedded into `boiler-plate.html` as necessary
      - CSS, JS, and TS are pushed into an array as required by the template
      - This step is referred to as **[template painting](#template-painting)**
   2. CSS and JS are embedded into the HTML (relationally) as required by `pageConfig.jsonc` and the templates
      - These CSS are referred to as **[CSS embeds](#css-embeds)**
      - These JS are referred to as **[runtime JS](#runtime-js)**
   3. **[Post-paint TS](#post-paint-ts)** functions are run as required by `pageConfig.jsonc` and the templates
   4. Page is filled with content using a [populator](#️-populators) function as described in `pageConfig.jsonc`
      - This step is referred to as **[content population](#content-population)**
   5. **[Post-population TS](#post-population-ts)** functions are run as required by `pageConfig.jsonc` and the templates
   6. **[TS includes](#ts-includes)** are run as required by `pageConfig.jsonc`
   7. The final HTML is written to `docs/` as `<page>.html`
4. The `docs/` or `test/` folder is now a static build of the site

## Naming conventions
| Type                                      | Naming convention                         | Remarks                 |
| :---------------------------------------- | :---------------------------------------- | :---------------------- |
| [Templates](#template)                    | Only lowercase letters and `-` for spaces | Name after the page     |
| [CSS embeds](#css-embeds)                 | Only lowercase letters and `-` for spaces | Name after the template |
| [Runtime JS](#runtime-js)                 | Only lowercase letters and `-` for spaces | Name after the template |
| Markdown files                            | Only lowercase letters and `-` for spaces | Name after the page     |
| TypeScript type declaration files         | PascalCase                                |                         |
| TypeScript files                          | camelCase                                 |                         |
| [Post-paint TS](#post-paint-ts)           | camelCase                                 | Start with a verb       |
| [Post-population TS](#post-population-ts) | camelCase                                 | Start with a verb       |
| [TS includes](#ts-includes)               | camelCase                                 | Start with a verb       |


# 📝 Writing content for the site
You are recommended to use the markdown [populator](#populator) for the most seamless experience.  

## Adding a new page

### Using the markdown [populator](#populator)
The markdown populator allows you to write content in markdown format and have it displayed on the site in the content field.  

0. You are recommended to read up on the basics of markdown if you are not familiar with it, or use the [markdown cheat sheet](https://www.markdownguide.org/cheat-sheet/); it is really very simple
1. Create a new `.md` file in the `pages/` folder, see [#naming-conventions](#naming-conventions)
   - If your page is nested under another page (i.e. `parent/child`), create a folder `parent` and put `child.md` file in it
2. Write your content in markdown format
   - Anything is fine really, but try not to skip heading levels (e.g. `#` to `###`) since I believe it breaks the parser or something
3. If you wish to use custom scripts or styles, create a new `.js` or `.css` file in the `scripts/` or `styles/` folder respectively; it is recommended that the scripts and styles are named after the page `name`
4. [Update `pageConfig.jsonc`](#updating-pageconfigjsonc) to include the new page
5. [Test the site](#-testing-the-site) to ensure that the changes are displayed correctly (not really necessary for simple content changes)
6. [Commit the changes](#-committing-changes) to the repository

## Using the HTML frame [populator](#populator)
The HTML frame populator allows you to write content in HTML format and have it displayed on the site in the content field.

1. Create a new `.html` file in the `pages/` folder, see [#naming-conventions](#naming-conventions)
   - If your page is nested under another page (i.e. `parent/child`), create a folder `parent` and put `child.html` file in it
2. Write your content in HTML format
   - You can use all the features of HTML and [templates](#template)
3. If you wish to use custom scripts or styles, create a new `.js` or `.css` file in the `scripts/` or `styles/` folder respectively; it is recommended that the scripts and styles are named after the page `name`
4. [Update `pageConfig.jsonc`](#updating-pageconfigjsonc) to include the new page
5. [Test the site](#-testing-the-site) to ensure that the changes are displayed correctly
6. [Commit the changes](#-committing-changes) to the repository

## Using the HTML full [replacer](#populator)
The HTML full replacer allows you to replace the entire content of a page with an HTML file.

1. Create a new `.html` file in the `pages/` folder, see [#naming-conventions](#naming-conventions)
   - If your page is nested under another page (i.e. `parent/child`), create a folder `parent` and put `child.html` file in it
2. Write your content in HTML format
    - Your file should be a full HTML document, including the `<html>`, `<head>`, and `<body>` tags
    - You can use all the features of HTML and [templates](#template)
3. If you wish to use custom scripts or styles, create a new `.js` or `.css` file in the `scripts/` or `styles/` folder respectively; it is recommended that the scripts and styles are named after the page `name`
4. [Update `pageConfig.jsonc`](#updating-pageconfigjsonc) to include the new page
5. [Test the site](#-testing-the-site) to ensure that the changes are displayed correctly
6. [Commit the changes](#-committing-changes) to the repository

## Making changes to an existing page
1. Open the file and make the necessary changes
2. If you have made new custom scripts or styles, [update `pageConfig.jsonc`](#updating-pageconfigjsonc)
3. [Test the site](#-testing-the-site) to ensure that the changes are displayed correctly (not really necessary for simple content changes)
4. [Commit the changes](#-committing-changes) to the repository

## Updating `pageConfig.jsonc`
See [`meta/pageConfig.jsonc`](meta/pageConfig.jsonc) for more information.  

### Adding a new entry
> Remember: copy-and-pasting is your friend!  

1. Add a new entry(/object) to the `pages` array in `pageConfig.jsonc`
   - Note that the order of the entries determine the order of the pages shown on the site catalogue
2. Change the `name` field to the name of the `.md`/`.html` file in `pages/` without the extension (e.g. `example.md` -> `example`); ***this must match the file name exactly***
   - If your page is nested under another page (i.e. `parent/child`):
     - Under the `parent` entry, add a `pages` array and add the new page object to it
     - Use `child` as the name
3. Change the `title` field to the title of the page as you want it to appear on the site; this is not necessary if the title is the same as the `name`
   - If unset, the `name`, capitalised, will be used as the title
4. Change the `populator` field to `markdown`/`html` to use the appropriate populator
5. If you are using custom scripts or styles, add them to the `scripts` and `styles` arrays respectively; it is recommended that the scripts and styles are named after the page `name`

## Shortcut
I recommend you to go through the steps above to understand how the site works. But still here's a shortcut if you are lazy and don't want to go through [#getting-started](#-getting-started).  
You can just get a file and upload/dump it [here](https://github.com/ResiSense/ResiSense.github.io/tree/main/pages) and I will take care of the rest. Use the ResiSense GitHub account to do this maybe despite it normally being [a terrible idea](#-committing-changes).  

# ✨ Working on the frontend
> Remember: copy-and-pasting is your friend!  

The frontend primarily makes use of [templates](#template), [CSS embeds](#css-embeds), and [runtime JS](#runtime-js) to structure the site. Your domain should mainly be `templates/`, `styles/`, and `scripts/`. Make sure you [understand the repository structure](#-understanding-the-repository-structure).  
[Test the site](#-testing-the-site) after making changes to ensure that they are displayed correctly.  

# 🖼️ Working on the framework
If you are working on the framework, you are probably comfortable enough to know what you are doing. [`siteBuilder.ts`](/siteBuilder.ts) is the entry point of the framework. Good luck!  

## `PageData`
[Definition](/lib/PageData.ts)  
`PageData` is a TypeScript type that is passed to internal builder functions, [post-paint TS](#post-paint-ts), [post-population TS](#post-population-ts), and [TS includes](#ts-includes), in this order.  
Variables can be attached onto this type to be passed down these functions.  

# 📖 Glossary

## Content population
Content population is the process of filling the content of a page with a [populator](#populator) function.

## CSS embeds
CSS embeds are CSS files that are embedded into the HTML relationally as `<link>` tags.  
Tags that reference [templates](#template) should use the [painted](#template-painting) tag name.

## [`pageConfig.jsonc`](meta/pageConfig.jsonc)
This file is probably the most important file in the repository. It describes the structure of the site and how the content is displayed.  
In short, it is a JSON file that describes the metadata of each page on the site. **It is required to edit this file to add new pages or change existing ones.**  
It is recommended to read the comments in the file itself to understand how it works. You can also refer to [updating `pageConfig.jsonc`](#updating-pageconfigjsonc) for more information.  

## Populator
Populators are functions that fill the content of a page. They are called by the framework to fill the content of a page.  
- [Markdown populator](/lib/markdownPopulator.ts): Fills the content of a page with a markdown file
- [HTML frame populator](/lib/htmlFramePopulator.ts.ts): Fills the content of a page with an HTML file
- [HTML full replacer](/lib/htmlFullReplacer.ts): Replaces the entire content of a page with an HTML file

It is recommended to read the comments in the files themselves to understand how it works.  

## Post-paint TS
Post-paint TS is the TS that is run after [painting](#template-painting) all [templates](#template).  
Only the default exported function is run, with [`PageData`](#pagedata) passed as the only argument.  
Variables that reference [templates](#template) should use the [painted](#template-painting) tag name.  
[CSS embeds](#css-embeds) are **NOT** in scope.  

## Post-population TS
Post-population TS is the TS that is run after [populating](#content-population) the content of a page.
Only the default exported function is run, with [`PageData`](#pagedata) passed as the only argument.  
Variables that reference [templates](#template) should use the [painted](#template-painting) tag name.  
[CSS embeds](#css-embeds) are **NOT** in scope.  

## Runtime JS
Runtime JS is the JS that is run during browsing. It is embedded into the HTML relationally as a `<script>` tag.  
Variables that reference [templates](#template) should use the [painted](#template-painting) tag name.  
[CSS embeds](#css-embeds) are in scope.  

## Template
A template is a partial HTML file that is embedded/[painted](#template-painting) into the boilerplate HTML or another template.  
Templates can recursively require CSS, JS, TS, and other templates in them with the following tags:
- `<custom-example />`: Paints a `templates/example.html` template
- `<ts-post-paint src="example.ts" />`: Runs `lib/example.ts` after [painting](#template-painting)
- `<ts-post-population src="example.ts" />`: Runs `lib/example.ts` after [populating](#content-population) the content
- `<js-runtime src="example.js" />`: Embeds `scripts/example.js` as a [runtime JS](#runtime)
- `<css-embed href="example.css" \/>`: Embeds `styles/example.css` as a [CSS embed](#css-embeds)

Note that the exact syntax of these tags must be followed for the framework to work correctly. Change only `example` to the name of the file.  

A [painted](#template-painting) template will have its tag replaced from `<custom-example />` to `<painted-example> </painted-example>` with the content of the template within.

## Template compilation
Template compilation is the process of recursively compiling [templates](#template).

## Template painting
Template painting is the process of embedding [templates](#template) into the boilerplate HTML.  
CSS, JS, and TS files are also pushed into arrays as required by the template.  

## TS includes
TS includes are the TS files that are run after [post-population TS](#post-population-ts).  
Only the default exported function is run, with [`PageData`](#pagedata) passed as the only argument.  
Variables that reference [templates](#template) should use the [painted](#template-painting) tag name.  
[CSS embeds](#css-embeds) are **NOT** in scope.  