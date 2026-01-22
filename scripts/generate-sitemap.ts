/**
 * Generate sitemap.xml for AI Interaction Atlas
 * Includes all static pages, task pages, and layer pages
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { loadAtlasData } from '../lib/dataLoader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOMAIN = 'https://ai-interaction.com';
const TODAY = new Date().toISOString().split('T')[0];

// Define static pages with priorities and change frequencies
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/privacy', priority: '0.3', changefreq: 'monthly' },
  { url: '/terms', priority: '0.3', changefreq: 'monthly' },
  { url: '/atlas', priority: '1.0', changefreq: 'weekly' },
  { url: '/atlas/ai', priority: '0.9', changefreq: 'weekly' },
  { url: '/atlas/human', priority: '0.9', changefreq: 'weekly' },
  { url: '/atlas/system', priority: '0.9', changefreq: 'weekly' },
  { url: '/atlas/data', priority: '0.9', changefreq: 'weekly' },
  { url: '/atlas/constraints', priority: '0.9', changefreq: 'weekly' },
  { url: '/atlas/touchpoints', priority: '0.9', changefreq: 'weekly' },
  { url: '/atlas/reference', priority: '0.8', changefreq: 'weekly' },
];

function escapeXml(str: string): string {
  return str.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function generateUrlEntry(url: string, priority: string = '0.8', changefreq: string = 'weekly'): string {
  return `  <url>
    <loc>${escapeXml(DOMAIN + url)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generateSitemap(): Promise<void> {
  console.log('🗺️  Generating sitemap...');

  // Load atlas data
  const data = await loadAtlasData();

  const urls: string[] = [];

  // Add static pages
  staticPages.forEach(page => {
    urls.push(generateUrlEntry(page.url, page.priority, page.changefreq));
  });

  // Add layer pages
  data.layers.forEach(layer => {
    urls.push(generateUrlEntry(`/atlas/layer/${layer.id}`, '0.8', 'weekly'));
  });

  // Add task pages
  const allTasks = [...data.ai_tasks, ...data.human_tasks, ...data.system_tasks];
  allTasks.forEach(task => {
    urls.push(generateUrlEntry(`/atlas/task/${task.id}`, '0.7', 'weekly'));
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  // Write to public folder
  const outputPath = join(__dirname, '../public/sitemap.xml');
  writeFileSync(outputPath, xml, 'utf8');

  console.log(`✅ Sitemap generated with ${urls.length} URLs`);
  console.log(`   - ${staticPages.length} static pages`);
  console.log(`   - ${data.layers.length} layer pages`);
  console.log(`   - ${allTasks.length} task pages`);
  console.log(`📁 Written to: ${outputPath}`);
}

generateSitemap().catch(err => {
  console.error('❌ Error generating sitemap:', err);
  process.exit(1);
});
