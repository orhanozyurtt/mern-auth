import jwt from 'jsonwebtoken';

const generateToken = (res, userId, isAdmin) => {
  //?bu fonksiyon çağırıldığı yerden bir res userId ve isAdmin bilgisin alıyor

  //!
  const accessToken = jwt.sign(
    { id: userId, isAdmin: isAdmin },
    process.env.JWT_SECRET,
    // { expiresIn: '1m' }
    { expiresIn: '1h' } // 1 saat
  );

  res.cookie('jwt', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1 * 60 * 60 * 1000, // 1 saat
    // maxAge: 10000,
  });

  return { accessToken };
};

const refreshToken = (res, userId, isAdmin) => {
  const refreshToken = jwt.sign(
    { id: userId, isAdmin: isAdmin },
    process.env.JWT_REFRESH_SECRET,
    // { expiresIn: '1d' }
    { expiresIn: '30d' } // 30 gün
    // {1m}
  );
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 gün
    // maxAge: 1 * 60 * 1000, // 1 dakika
  });
  return { refreshToken };
};
export { generateToken, refreshToken };
