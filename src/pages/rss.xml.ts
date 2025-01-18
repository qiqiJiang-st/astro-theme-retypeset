import type { APIContext } from 'astro'
import type { CollectionEntry } from 'astro:content'
import themeConfig from '@/config'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

const parser = new MarkdownIt()
const { title, description, url } = themeConfig.site
const { locale } = themeConfig.global
const followConfig = themeConfig.seo?.follow

// Extract first 100 chars from content as description
function getExcerpt(content: string): string {
  const plainText = sanitizeHtml(
    parser.render(content),
    {
      allowedTags: [],
      allowedAttributes: {},
    },
  )

  return `${plainText.slice(0, 100).trim()}...`
}

// Generate RSS feed for default language
export async function GET() {
  // Only handle posts for default language
  const posts = await getCollection(
    'posts',
    ({ data }: { data: CollectionEntry<'posts'>['data'] }) =>
      (!data.draft && (data.lang === locale || data.lang === '')),
  )

  return rss({
    title,
    description,
    site: url,
    stylesheet: '/rss/styles.xsl',
    // Map posts to RSS items
    items: posts.map((post: CollectionEntry<'posts'>) => ({
      title: post.data.title,
      pubDate: post.data.published,
      description: post.data.description || getExcerpt(post.body),
      link: `/posts/${post.slug}/`,
      content: sanitizeHtml(
        parser.render(post.body),
        {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        },
      ),
    })),
    // Add language and follow challenge info
    customData: `
      <language>${locale}</language>
      ${followConfig?.feedID && followConfig?.userID
          ? `<follow_challenge>
          <feedId>${followConfig.feedID}</feedId>
          <userId>${followConfig.userID}</userId>
        </follow_challenge>`
          : ''
      }
    `.trim(),
  })
}
