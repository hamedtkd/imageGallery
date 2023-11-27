import { z } from "zod";

const BasicSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  perv_page: z.string().optional(),
  next_page: z.string().optional(),
  total_results: z.number(),
});

const User = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
});
export const VideoFile = z.array(
    z.union([
      z.object({
        id: z.number(),
        quality: z.string(),
        file_type: z.string(),
        width: z.number(),
        height: z.number(),
        link: z.string()
      }),
      z.object({
        id: z.number(),
        quality: z.string(),
        file_type: z.string(),
        width: z.null(),
        height: z.null(),
        link: z.string()
      })
    ])
  );

export const VideoPicture = z.array(
  z.object({ id: z.number(), picture: z.string(), nr: z.number() }));

export const VideoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  image: z.string(),
  duration: z.number(),
  user: User,
  video_files: VideoFile,
  video_pictures: VideoPicture,
});


export const VideoSchemaWithVideo = BasicSchema.extend({
  videos: z.array(VideoSchema),
});

export type VideoResults = z.infer<typeof VideoSchemaWithVideo>;
export type Video = z.infer<typeof VideoSchema>;
