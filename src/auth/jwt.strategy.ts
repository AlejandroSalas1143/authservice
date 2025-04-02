import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EncoderService } from "./encoder.service";
import { JwtPayload } from "./jwt.payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private encoderService: EncoderService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '2f7a8e9d0a5d3b8c61c5e7d12e9c8a7f7b6c5e8d7a9b0c6d5e8a9b7c0d6e8a7f',
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.encoderService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}