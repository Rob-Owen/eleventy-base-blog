module.exports = {
	"layout": "layouts/app_subpage.njk",
	eleventyComputed: {
		ogImage: (data) => {
			if (data.ogImage) return data.ogImage;
			if (!data.appleAppId || data.layout !== "layouts/app_showcase.njk") return undefined;
			return `/apps/${data.page.fileSlug}/icon.png`;
		}
	}
};
