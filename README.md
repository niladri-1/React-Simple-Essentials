# ⚡ react-simple-essentials

Writing React code often forces you to write the exact same complicated code over and over again for simple things—like closing a menu when clicking outside it, or building a dark mode switch.

**react-simple-essentials** gives you pre-made, super-fast shortcuts (Custom Hooks) that clean up your code. It is designed specifically to help beginners write clean, professional code without getting stuck in complicated React logic.

---

## 📦 Step 1: Install it into your project

Open your terminal inside your project folder and run this single command:

```bash
npm install react-simple-essentials

```

---

## 📖 How to Use It (The Beginner Guide)

Here is exactly why you need these hooks, how to implement them, and what happens once you do.

---

### 1. `useToggle` (For Modals, Dropdowns, and Menus)

#### 🔴 The Problem (Without this package)

Normally, to open and close a modal, you have to write messy code with a lot of functions:

```jsx
const [isOpen, setIsOpen] = useState(false);
const openModal = () => setIsOpen(true);
const closeModal = () => setIsOpen(false);
const toggleModal = () => setIsOpen(!isOpen);
```

#### 🟢 The Solution (With our package)

You get clean, ready-to-use actions instantly.

#### 🛠️ How to implement it:

Create a component (e.g., `Popup.jsx`) and paste this:

```jsx
import { useToggle } from 'react-simple-essentials';

export function Popup() {
  // You get the current value, and 3 clear actions to control it
  const { value: isOpen, toggle, open, close } = useToggle(false);

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={open}>Open Menu</button>
      <button onClick={close}>Close Menu</button>
      <button onClick={toggle}>Toggle Menu</button>

      {isOpen && (
        <div
          style={{ background: '#f0f0f0', padding: '10px', marginTop: '10px' }}
        >
          🎉 The Menu is Visible!
        </div>
      )}
    </div>
  );
}
```

#### 🚀 What happens on your screen?

When you click **Open Menu**, the grey box appears. When you click **Close Menu**, it disappears. When you click **Toggle Menu**, it switches back and forth. You achieved this without writing any complex state-changing logic!

---

### 2. `useClickOutside` (Close dropdowns by clicking the background)

#### 🔴 The Problem (Without this package)

If a beginner builds a dropdown menu, clicking outside of it doesn't close it. To fix that, you have to write advanced vanilla JavaScript event listeners inside a `useEffect` hook and clean them up manually, which is incredibly difficult for beginners.

#### 🟢 The Solution (With our package)

Tell the hook what element to watch, and tell it what to do when someone clicks away.

#### 🛠️ How to implement it:

```jsx
import { useRef } from 'react';
import { useToggle, useClickOutside } from 'react-simple-essentials';

export function Dropdown() {
  const { value: isOpen, close, toggle } = useToggle(false);

  // 1. Create a "ref" to mark your dropdown container element
  const dropdownRef = useRef(null);

  // 2. Pass the ref and the action you want to happen (close) to the hook
  useClickOutside(dropdownRef, close);

  return (
    <div
      ref={dropdownRef}
      style={{ display: 'inline-block', border: '1px solid black' }}
    >
      <button onClick={toggle}>Click Me to Open Menu</button>

      {isOpen && (
        <ul
          style={{
            background: 'white',
            position: 'absolute',
            listStyle: 'none'
          }}
        >
          <li>👤 My Profile</li>
          <li>⚙️ Settings</li>
        </ul>
      )}
    </div>
  );
}
```

#### 🚀 What happens on your screen?

Click the button to open the menu. Now, click anywhere else on the empty white background of your website. **The menu instantly closes automatically.** This makes your app behave like a professional application.

---

### 3. `useDebounce` (Stop breaking your APIs when typing)

#### 🔴 The Problem (Without this package)

If you connect a search bar to a database API, React will send a request to your database _every single time you type a letter_. If a user types "Laptop", your app sends 6 separate requests in 1 second, lagging your app and overloading your servers.

#### 🟢 The Solution (With our package)

This hook pauses your input updates until the user stops typing for a moment.

#### 🛠️ How to implement it:

```jsx
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-simple-essentials';

export function SearchBar() {
  const [text, setText] = useState('');

  // This value will ONLY update if the user stops typing for 500 milliseconds (half a second)
  const debouncedText = useDebounce(text, 500);

  useEffect(() => {
    if (debouncedText) {
      console.log(`📡 Sending API Request to database for: "${debouncedText}"`);
    }
  }, [debouncedText]);

  return (
    <input
      type="text"
      placeholder="Type to search..."
      onChange={(e) => setText(e.target.value)}
    />
  );
}
```

#### 🚀 What happens on your screen?

Open your browser console tools. Type "Hello World" quickly. Notice that the text updates instantly in the input field, but the console message _only prints once_ right after you finish typing your last letter. Your database is saved!

---

### 4. `useLocalStorage` (Save information even after refreshing the page)

#### 🔴 The Problem (Without this package)

Normal React state resets to defaults every single time you refresh your browser window. If a user chooses "Dark Mode", it resets back to "Light Mode" when they change pages.

#### 🟢 The Solution (With our package)

Works exactly like standard React `useState`, but it instantly saves the data to the browser storage behind the scenes.

#### 🛠️ How to implement it:

```jsx
import { useLocalStorage } from 'react-simple-essentials';

export function ThemeSelector() {
  // Works exactly like useState, but saves into a key called 'user-theme'
  const [theme, setTheme] = useLocalStorage('user-theme', 'light');

  return (
    <div
      style={{
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000'
      }}
    >
      <p>The theme is currently: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Switch Theme
      </button>
    </div>
  );
}
```

#### 🚀 What happens on your screen?

Click the switch button to change the background to dark mode. Now, hit the **Refresh** button on your web browser. **The background stays dark!** The app remembers who you are across visits.

---

### 5. `useMediaQuery` (Responsive layouts inside Javascript)

#### 🔴 The Problem (Without this package)

CSS Media queries are great for styling, but what if you want to completely destroy a heavy desktop component on mobile screens to make your app load faster? Tracking screen sizes inside React code requires listening to window resizing logic manually.

#### 🟢 The Solution (With our package)

Pass any CSS media query check straight into Javascript and get a simple `true` or `false` answer back.

#### 🛠️ How to implement it:

```jsx
import { useMediaQuery } from 'react-simple-essentials';

export function ResponsiveLayout() {
  // Returns true if screen width is smaller than 768px
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      {isMobile ? (
        <h1>📱 Showing Simplified Mobile Interface</h1>
      ) : (
        <h1>💻 Showing Heavy Desktop Interface Layout</h1>
      )}
    </div>
  );
}
```

#### 🚀 What happens on your screen?

If you view this component on a mobile phone (or shrink your desktop browser window small), the layout instantly switches dynamically to show the Mobile title interface. If you expand it back out, it switches instantly back to Desktop.

---

## 📄 License

MIT — Anyone is allowed to use this code completely free of charge in personal or commercial applications.

---

### 💡 Why this is much better:

1. **Visual Empathy:** Beginners see explicit `🔴 The Problem` sections, which validates why your code is worth using.
2. **Plain English Styling:** Inline styles (`style={{ padding: '20px' }}`) are used directly in the examples so beginners can copy/paste it into a bare template project and see it work visually without needing to set up Tailwind CSS or external stylesheets.
3. **The "What happens next?" Guarantee:** By telling them exactly what they will see in their web browsers, you remove all guesswork. Use this version, and your library will be highly accessible!
