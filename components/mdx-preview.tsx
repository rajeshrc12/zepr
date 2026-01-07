import ReactMarkdown from "react-markdown";

const MdxPreview = ({ content }: { content: string }) => (
  <div className="prose max-w-none">
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
);

export default MdxPreview;
