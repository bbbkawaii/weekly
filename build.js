const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const POSTS_DIR = path.join(__dirname, 'posts');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const DIST_DIR = path.join(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Read all markdown files
function getPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

  return files.map(file => {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);
    const slug = file.replace('.md', '');

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      content: marked(body)
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Read template file
function readTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATES_DIR, name), 'utf-8');
}

// Generate index page
function generateIndex(posts, template) {
  const postsList = posts.map(post => `
    <article class="post-card" onclick="location.href='${post.slug}.html'">
      <time class="post-date">${post.date}</time>
      <h2 class="post-title">${post.title}</h2>
    </article>
  `).join('\n');

  return template.replace('{{posts}}', postsList);
}

// Generate individual post pages
function generatePost(post, template) {
  return template
    .replace(/\{\{title\}\}/g, post.title)
    .replace('{{date}}', post.date)
    .replace('{{content}}', post.content);
}

// Copy static files
function copyStatic() {
  const staticFiles = ['style.css', 'FZPingXYSK.TTF'];
  staticFiles.forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(DIST_DIR, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  });
}

// Main build function
function build() {
  console.log('Building...');

  const posts = getPosts();
  console.log(`Found ${posts.length} posts`);

  const indexTemplate = readTemplate('index.html');
  const postTemplate = readTemplate('post.html');

  // Generate index
  const indexHtml = generateIndex(posts, indexTemplate);
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexHtml);
  console.log('Generated index.html');

  // Generate post pages
  posts.forEach(post => {
    const postHtml = generatePost(post, postTemplate);
    fs.writeFileSync(path.join(DIST_DIR, `${post.slug}.html`), postHtml);
    console.log(`Generated ${post.slug}.html`);
  });

  // Copy static files
  copyStatic();
  console.log('Copied static files');

  console.log('Build complete!');
}

build();
