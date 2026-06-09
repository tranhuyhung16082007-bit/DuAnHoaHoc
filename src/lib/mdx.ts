import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Constants for content directory
const contentDir = path.join(process.cwd(), "content");

export async function getLessonData(grade: string, chapterId: string, lessonId: string) {
  const filePath = path.join(contentDir, grade, chapterId, `${lessonId}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Parse frontmatter
    const { data: frontmatter, content } = matter(fileContent);

    return {
      success: true as const,
      frontmatter,
      content
    };
  } catch (error) {
    return {
      success: false as const,
      error: `Không tìm thấy file bài học: ${filePath}`
    };
  }
}
