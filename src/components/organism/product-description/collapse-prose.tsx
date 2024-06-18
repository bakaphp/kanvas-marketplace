'use client'
import { useState } from "react";
import Prose from "@/components/atoms/prose";
import { translate } from "@/translate";
const CollapsibleProse = ({ html, maxLength }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedHtml = html.length > maxLength ? html.substring(0, maxLength) + "..." : html;

  return (
    <div>
      <Prose html={isExpanded ? html : truncatedHtml} className="mb-6 text-sm leading-tight text-white" />
      {html.length > maxLength && (
        <button
          onClick={toggleExpansion}
          className="text-blue-500"
        >
          {isExpanded ? translate("general.show-less") : translate("general.show-more")}
        </button>
      )}
    </div>
  );
};

export default CollapsibleProse;
