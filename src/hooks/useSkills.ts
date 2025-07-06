// import { useMemo } from "react";
// import { useSkillsService } from "@/services/ServiceContainer";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { useCategory } from "@/contexts/CategoryContext";
// import { SkillsViewData } from "@/interfaces/ISkillsService";

// export const useSkills = () => {
//   const { t } = useLanguage();
//   const { category } = useCategory();
//   const skillsService = useSkillsService();

//   // Memoize the skills view data
//   const viewData: SkillsViewData = useMemo(() => {
//     return skillsService.getSkillsViewData(category, t);
//   }, [category, t, skillsService]);

//   return {
//     viewData
//   };
// };