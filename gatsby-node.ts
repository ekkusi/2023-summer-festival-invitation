import { GatsbyNode } from "gatsby";
import { resolve } from "path";
import data from "./src/data.json";

export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions;

  const invitants = data;

  invitants.forEach((it) => {
    const path = `/${it.id}`;

    console.log("Creating page: ", path);

    createPage({
      path,
      component: resolve("./src/templates/invitation.tsx"),
      context: it,
    });
  });
};
