# OptionXi Website
This is the Nxt Js 14 website, for optionxi. Following is the procedure to design your own version of the website. Follow the installation steps or clone it and use it for your personel projects.


### Steps to create your own Next Js Website
- Create new nxt application by using
```
npx create-next-app <project-name>
```
- Use the default installation
    - Tailwind? `y`
    - ESlint? `y`
    - Tailwindcss? `y`
    - src directory? `y`
    - App router? `y`
    - import alias? `n`

- `cd <projectname` into the project
- Install shadcn
```
npm install shadcn
```
    - Use default settings
    - components? `y`
    - `New york`
    - `Neutral`
    - css vriable? `y`

- Install shadcn components
```
npm shadcn add component_name
```
    - dialog
    - button
    - input
    - label
    - tabs
- Just copy paste the `src/components/ui` folder

### Running on dev
It will be available on `localhost:3000`
```
npm run dev
```
### Running on production
To check for eslint errors, and check if all pages are rendered properly
```
npm run build
```

### Things to note
- Middleware
It is used for checking authentications mainly
- Next Auth
When using next auth, you should know that it act as intermediatery, you might want to reauthenticate users using firebase token
- Using .env
For safe keeping credentials use .env in the project top directory, and use it like
```
process.env.YOUR_SECRET_KEY
```
```
YOUR_SECRET_KEY=G-Q90KP1J930
```