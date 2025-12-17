# Складні SQL Запити

## 1. Топ-10 авторів за лайками

### Бізнес-питання

Хто є найпопулярнішими авторами на платформі за кількістю отриманих лайків?

### SQL Запит

\`\`\`sql
SELECT
u.id,
u.username,
u.full_name,
u.avatar_url,
COUNT(DISTINCT p.id) as post_count,
COUNT(DISTINCT pl.user_id) as total_likes,
SUM(p.view_count) as total_views
FROM users u
JOIN posts p ON u.id = p.author_id
LEFT JOIN post_likes pl ON p.id = pl.post_id
WHERE p.status = 'published'
AND p.deleted_at IS NULL
AND u.deleted_at IS NULL
GROUP BY u.id, u.username, u.full_name, u.avatar_url
HAVING COUNT(DISTINCT p.id) > 0
ORDER BY total_likes DESC, total_views DESC
LIMIT 10;
\`\`\`
