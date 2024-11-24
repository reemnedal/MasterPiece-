// this tanble was deleted i do not know if it is correct or no 


// -- Table: public.photographer_images

// -- DROP TABLE IF EXISTS public.photographer_images;

// CREATE TABLE IF NOT EXISTS public.photographer_images
// (
//     image_id integer NOT NULL DEFAULT nextval('photographer_images_image_id_seq'::regclass),
//     photographer_id integer NOT NULL,
//     img_url character varying(255) COLLATE pg_catalog."default" NOT NULL,
//     is_deleted boolean DEFAULT false,
//     created_at timestamp without time zone DEFAULT now(),
//     updated_at timestamp without time zone DEFAULT now(),
//     CONSTRAINT photographer_images_pkey PRIMARY KEY (image_id),
//     CONSTRAINT photographer_images_photographer_id_fkey FOREIGN KEY (photographer_id)
//         REFERENCES public.users (user_id) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE CASCADE
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.photographer_images
//     OWNER to postgres;