import crypto from "crypto"

export function generateRandomID(): string{
    return crypto.randomBytes(16).toString('hex');
}