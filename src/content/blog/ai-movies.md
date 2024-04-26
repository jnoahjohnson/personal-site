---
title: "Using AI to Generate Movie Plots"
description: "A project overview on generating Hallmark movie plots with OpenAI"
pubDate: "Aug 19 2022"
heroImage: "/assets/blog/ai-movies.avif"
---

Recently, we were browsing movies on a streaming service and got to what could be described as a "Hallmark movie section." While not from Hallmark movies, these embodied the basic plot points of every cheesy romance that they have come to embody. A small-town girl returns to her city after years apart to save the family business and fall in love. That kind of movie.

My developer brain started turning, and I realized that I could probably figure out a way to generate these plots just based on the title. So, that is precisely what I did. Here is how I did it, the lessons learned, and where this project could go in the future.

## Using OpenAI

The first step that I took was just playing around with OpenAI. If you are unfamiliar, OpenAI has come out with some incredible models for text completion, image generation, and more. It is the service that [GitHub Copilot](https://github.com/features/copilot) uses, and recently [DALL-E 2](https://openai.com/dall-e-2/) has been highlighted by many publications.

For this project, I used one of the core GPT-3 models called Davinci. It essentially understands and processes text to be able to intelligently complete a variety of plots. Some examples are correcting grammar, summarizing articles or books, creating an ad from a product description, converting movie titles into emojis, and many more. Seriously, check out all of their [examples](https://beta.openai.com/examples), and you will be amazed with everything it can do.

I started off by just using their playground to get some simple plot summaries back. I would give a few examples, then a movie title and request a plot summary back. Here is what that looks like:

![Screen Shot 2022-08-07 at 5.27.26 PM.png](https://res.craft.do/user/full/a2acadef-3a26-13af-fbec-424187b06ba1/doc/41E9A9DA-6678-42E7-AF17-B2024C0634BE/AF0789ED-0D7E-4218-B886-974428FF2DD0_2/gclGF7xOmBjAiltwkAY23xyTWxmqZioqEJum3I5n3OEz/Screen%20Shot%202022-08-07%20at%205.27.26%20PM.png)

We were on vacation when I did this, so we started just coming up with as many ideas as we could as we laughed at the many responses from the OpenAI playground. This was enjoyable, but I thought that it could be better as well as integrate in with a website of its own.

## Fine-Tuning

One of the features of the OpenAI API is that you can create fine-tuned models to suit your specific needs. Basically, you can feed it all the example data that you see above (in this case titles and plots) and it will train the model to be more accurate to what you are looking for. It will also be more cost-effective and faster since it doesn't need to process all the text every single time.

I initially just looked at Google to see how many plot summaries I could find. This worked to initially understand how fine-tuning works, but generally, you want more data. This is when I turned to [The Movie DB](https://www.themoviedb.org/). They have an API that lets you query for movies with keywords, titles, or, in my case, companies.

I pulled all the Hallmark movies I could find into a single JSON object with the title and plot summary. I could have done this in a variety of ways, but wanted to try out [Deno](https://deno.land/) (which is an alternative JavaScript runtime to NodeJS). Using a simple function, I looped through the pages of data and wrote it all to a JSON file.

![Image.png](https://res.craft.do/user/full/a2acadef-3a26-13af-fbec-424187b06ba1/doc/41E9A9DA-6678-42E7-AF17-B2024C0634BE/16A7E73D-72D7-461C-BB90-CB9DE77E1DAC_2/JfMy0iiuJ3CIgyFogUba70R4Uem6ebTuT7Ls5QkRhE4z/Image.png)

After, I was able to use this data, along with OpenAI's CLI tool, to prepare and train a new fine-tuned model. While I intend to go more in depth in a future article with the technical details, you can find more information on [OpenAI's website](https://beta.openai.com/docs/guides/fine-tuning).

Scraping in this way gave me a few hundred examples for the model, but once I started it, I realized that there was an issue. Some of the data that I was getting was listed under Hallmark movies, but didn't quite fit into what we were hoping to generate with the tool. For example, there were some horror movies, so occasionally I would give the model a title and a very un-romantic movie plot would be generated.

To resolve this, I went back through and manually deleted some movies from the training data. This is one way I want to improve the tool in the future. Using The Movie DB's API, I could have added in keywords to narrow down the movies, or be able to get more data outside what they listed as Hallmark movies.

With the issue of variability in the training model resolved, I was able to move onto creating an application that would utilize this fine-tuned model, allowing users a nice interface to create the Hallmark movie plots of their dreams.

## Creating the Web Application

Recently, I have been building many applications using [Remix](https://remix.run/). While I almost reached for a different framework to try out, I decided to stick with Remix as I really enjoy the experience of using and deploying project in it. At first, I just created a single page with minimal styling (using [TailwindCSS](https://tailwindcss.com/)) to get a simple form setup that accepts a movie title. This then POSTs to an ActionFunction that returns the plot summary from OpenAI.

![Image.png](https://res.craft.do/user/full/a2acadef-3a26-13af-fbec-424187b06ba1/doc/41E9A9DA-6678-42E7-AF17-B2024C0634BE/A71618B9-B5EE-43AF-9DEE-BAC4B517C868_2/nP5pQkMElFrQ8BQXFznBR6FwZWZrvUbapqUroyNZOoMz/Image.png)

While not pretty, it was a great example of how easy it is to set up a simple form, query data using the OpenAI JavaScript SDK and display it on the page. Here is what it looked like:

![Image.jpeg](https://res.craft.do/user/full/a2acadef-3a26-13af-fbec-424187b06ba1/doc/41E9A9DA-6678-42E7-AF17-B2024C0634BE/66C425B9-2F89-406D-8F40-64C7EE0EF497_2/xxMYVkZn45dEYfKhYu1WBMkiiHP2M1v4rcBBgUViJXgz/Image.jpeg)

You might notice that the prompt is also considerably longer and more detailed. There is always some variance, but I noticed that the fine-tuned model definitely is more detailed and accurate (by our measure of accuracy, having watched Hallmark movies).

The last step was to add a bit more style to the website. I also added some simple authentication, so I could share it with some friends without needing to get it approved by OpenAI. I do hope to build it out a little more to be able to get approval and put it out there for anyone to use.

Not only that, but I used [Framer Motion](https://www.framer.com/motion/) for some simple animations and fleshed out the rest of the page. It is still simple, but I really liked how the experience turned out. Here is an example:

![AnimatedImage.gif](https://res.craft.do/user/full/a2acadef-3a26-13af-fbec-424187b06ba1/doc/41E9A9DA-6678-42E7-AF17-B2024C0634BE/31687B20-C8D9-4E58-AB23-8305422CAEDC_2/tC0HcYZnzkPetGNhYutUiYRjRMkghRVqAACy5MLk4voz/AnimatedImage.gif)

## Conclusion

Moving forward with this really fun sample project, there is so much that you could do. First, a variety of fine-tuned models could be used for specific types of movies or genres. Additional prompts could be passed into the OpenAI model for more variance and experimentation. The model also allows for parameters, such as how many risks it should take on the completion. It would be a good playground to show how modifying those parameters would affect the output.

Other examples I have seen were models that generated entire scripts. It would be hilarious (and educational) to see what a model like this could do with more data, such as the scripts, from a variety of Hallmark or other films.

Overall, this was a great example of bringing together multiple technologies (some that I had not used before). Using OpenAI, Deno, Remix, TailwindCSS, and Framer Motion all together into a cohesive project and then deploying it on Vercel is a great example of the power of modern tools that we have at our disposal.

I would love to put a little more work into this project so that others could play around with it, so sign up to be notified when I write that and other similar articles.

Please let me know what you think and if there are any movie titles that you want to see the AI-generated plots for!
