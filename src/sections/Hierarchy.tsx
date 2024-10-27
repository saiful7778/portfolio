import HierarchyNode from "@/components/HierarchyNode";
import SectionElement from "@/components/SectionElement";
import createAppDirHierarchy from "@/lib/createAppDirHierarchy";

const Hierarchy: React.FC = () => {
  const hierarchyData = createAppDirHierarchy();

  console.log(hierarchyData);

  return (
    <SectionElement title="Folder structure" text="Structure of this app" blob>
      <div className="mx-auto max-h-96 min-h-fit w-full max-w-3xl overflow-auto rounded-md bg-card p-4">
        {hierarchyData ? (
          <ul>
            {hierarchyData.map((node, idx) => (
              <HierarchyNode key={`hierarchy-node-${idx}`} node={node} />
            ))}
          </ul>
        ) : (
          <div className="text-center text-2xl font-bold text-destructive">
            Something went wrong
          </div>
        )}
      </div>
    </SectionElement>
  );
};

export default Hierarchy;
