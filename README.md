# Portfolio Website - PiRATEO1

An interactive, animated portfolio website with GitHub integration, designed to showcase skills, projects, and achievements.

## 🌟 Features

- **8 Sections**: Landing Page, Skills, Internships/Work Experience, Projects (GitHub), Training, Certifications, Achievements, Education & Co-curricular
- **GitHub Integration**: Automatically fetches and displays repositories from your GitHub profile
- **Interactive Animations**: Smooth scroll reveals, typing effects, hover animations, particle effects
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark design with vibrant accent colors
- **Easy Customization**: Simple configuration to update your information

## 🚀 Deployment to GitHub Pages

### Method 1: Using GitHub Web Interface (Recommended)

1. **Create a New Repository**
   - Go to [GitHub](https://github.com)
   - Click the **+** icon → **New repository**
   - Repository name: `yourusername.github.io` (replace `yourusername` with your GitHub username)
   - Select **Public**
   - Click **Create repository**

2. **Upload Files**
   - Click **uploading an existing file**
   - Drag and drop these files:
     - `index.html`
     - `style.css`
     - `script.js`
   - Click **Commit changes**

3. **Access Your Site**
   - Your site will be live at: `https://yourusername.github.io`

### Method 2: Using Git

```bash
# Clone the repository
git clone https://github.com/yourusername/yourusername.github.io.git

# Navigate to the directory
cd yourusername.github.io

# Add your files
git add .
git commit -m "Initial commit"

# Push to GitHub
git push origin main
```

## ⚙️ Configuration

### Update GitHub Username

Open `script.js` and change the username:

```javascript
const GITHUB_USERNAME = 'PiRATEO1'; // Change to your GitHub username
```

### Update Personal Information

Edit `index.html` to update:

- **Name**: Change "PiRATEO1" in the hero section
- **Tagline**: Update your professional tagline
- **Social Links**: Update your social media URLs
- **Experience**: Edit the timeline items in the Experience section
- **Skills**: Modify the skill cards with your tech stack
- **Training**: Update training programs
- **Certifications**: Add your certifications
- **Achievements**: Customize achievements
- **Education**: Update your academic background

### Customizing Colors

Edit `style.css` to change the color scheme:

```css
:root {
    --primary-color: #00d4ff;      /* Change main color */
    --secondary-color: #7b2cbf;    /* Change secondary color */
    --accent-color: #ff006e;       /* Change accent color */
    --dark-bg: #0a0a0a;            /* Change background */
    --card-bg: #151515;            /* Change card background */
}
```

## 📁 File Structure

```
portfolio/
├── index.html      # Main HTML file
├── style.css      # All styling and animations
├── script.js      # JavaScript functionality
└── README.md      # This file
```

## 🎨 Animations Included

- **Typing Effect**: Animated text typing in hero section
- **Particle Effects**: Floating particles in hero background
- **Code Rain**: Animated code symbols falling
- **Scroll Reveal**: Sections animate on scroll
- **Skill Bars**: Animated progress bars
- **Card Hover**: Interactive hover effects
- **Timeline Animation**: Work experience timeline
- **Counter Animation**: GitHub stats counting up
- **Smooth Scrolling**: Navigation smooth scroll

## 🔧 Technologies Used

- HTML5
- CSS3 (Custom Properties, Animations, Flexbox, Grid)
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Feel free to fork this repository and customize it for your own portfolio!

## 📄 License

MIT License - Feel free to use this for your own portfolio.

---

Built with ❤️ by PiRATEO1
