
// firebase 国内被墙掉了。。。找到替换的再用把
export default async (req, res) => {
  // if (req.method === 'POST') {
  //   console.log('post');
  //   const ref = db.ref('views').child(req.query.slug);
  //   const res = await ref.transaction((currentViews) => {
  //     if (currentViews === null) {
  //       return 1;
  //     }
  //     return currentViews + 1;
  //   });
  // }

  // if (req.method === 'GET') {
  //   const snapshot = await db.ref('views').child(req.query.slug).once('value');
  //   const views = snapshot.val();
  //   return res.status(200).json({ total: views });
  // }
};
