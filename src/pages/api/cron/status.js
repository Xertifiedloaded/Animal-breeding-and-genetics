export default async function handler(req, res) {
  const authHeader = req.headers.authorization

  if (authHeader !== `Bearer cfca5d11c7ed9a41b1a3e063c32d5114`) {
    return res.status(401).send("Unauthorized")
  }

  return res.status(200).json({ success: true })
}
