export interface WebhookConfig {
  name?: string;
  /**
   * As URI
   * ```
   * data:image/jpeg;base64,BASE64_ENCODED_JPEG_IMAGE_DATA
   * ```
   */
  avatar?: string;
  channel_id?: string;
}
