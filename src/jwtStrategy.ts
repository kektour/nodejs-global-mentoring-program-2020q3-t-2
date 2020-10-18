import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { UserDAL, UserDALImpl } from './dataAccess/user';
import { Payload } from './services/auth';
import { UtilsService, UtilsServiceImpl } from './services/utils';

const utilsService: UtilsService = new UtilsServiceImpl();
const userDAL: UserDAL = new UserDALImpl(utilsService);

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: utilsService.getEnvVar('SECRET'),
};

export default new JwtStrategy(options, async (payload: Payload, done) => {
  try {
    const user = await userDAL.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    console.log(err);
  }
});
