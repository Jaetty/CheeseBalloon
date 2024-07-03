"use client";

import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

interface EditorProps {
  setContentProps: (newValue: string | null) => void;
}

const API_KEY = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
const AUTH = process.env.NEXT_PUBLIC_BEARER_AUTH;
const IMAGE_UPLOAD_API = process.env.NEXT_PUBLIC_NOTICE_IMAGE_UPLOAD_API_URL;

export default function TinyMCE({
  setContentProps,
}: EditorProps) {
  const [content, setContent] = useState<string | null>(null);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  useEffect(() => {
    setContentProps(content);
  }, [setContentProps, content]);

  return (
    <div>
      <Editor
        id="TinyMCE"
        apiKey={API_KEY}
        onInit={(_evt, editor) => {
          editorRef.current = editor;
        }}
        onEditorChange={setContent}
        init={{
          height: 500,
          width: "100%",
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "lists table link charmap searchreplace | " +
            "image media emoticons fullscreen preview | " +
            " help ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          images_upload_handler: async (img) => {
            const formData = new FormData();
            formData.append("file", img.blob());
            const res = await fetch(`${IMAGE_UPLOAD_API}`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${AUTH}`,
              },
              body: formData,
            });
            const resData = await res.json();

            return resData.data.imgUrl;
          },
        }}
      />
    </div>
  );
}
