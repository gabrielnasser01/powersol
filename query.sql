SELECT u.wallet, a."code", a."invitesCount", a."earnedTotal"
FROM "Affiliate" a
JOIN "User" u ON u.id = a."ownerUserId"
WHERE a."code" = 'AFF-e318658c';
