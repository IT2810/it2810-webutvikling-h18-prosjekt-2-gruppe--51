# Project 2, Group 52

## Contents

- [Project 2, Group 52](#project-2-group-52)
  - [Contents](#contents)
  - [Project description](#project-description)
  - [React](#react)
  - [UI Elements](#ui-elements)
    - [Selector Panel](#selector-panel)
    - [Audio and Text components](#audio-and-text-components)
  - [AJAX & JSON](#ajax--json)
  - [Responsive web design](#responsive-web-design)
  - [Collaboration](#collaboration)

## Project description

The goal of the project is to create an art gallery website that combines three forms of media into one package; an *image*, a *text* and a piece of *audio*. The user gets a choice between three categories for each type of media, and upon confirming the choice the website will generate four combinations of the chosen media categories.

## React

For this project we use React, which is a rich JS library for building user interfaces. React introduces new concepts and ways of thinking to easily create interactive and reusable UI components. The main concepts involve props and state for each component, and the idea that state gets passed down the component hierarchy, and back up again through callbacks.

## UI Elements

The user interface of the website consists of three main areas:

| Tabs |        |
|:-----|-------:|
| Media|Controls|

Where the *Media* area will be further divided into an area for the image, text and audio controls.
The controls area houses the controls that give the user the ability to choose between categories and start the media generating process.

Since each media type has three categories, and the user has to choose one and only one, the natural solution is to use three radio buttons per media type, one for each category:

Media 1

- category 1
- category 2
- category 3

Media 2

- category 1
- category 2
- category 3

and so on.

### Selector Panel

We implemented the radio buttons as a component called `SelectorPanel`, which takes a list of objects that describes each category and their options in the following format:

```JS
[{groupName: "media 1",
        legend: "choose a category of media 1",
        options: ["cat 1", "cat 2", "cat 3"]},
{groupName: "media 2",
        legend: "choose a category of media 2",
        options: ["cat 1", "cat 2", "cat 3"]},
...]
```

While feeding a list of objects into the component is one approach, we could also have made use of nested components in the JSX directly, but that might have ended up being more cumbersome, having to pass callbacks into each of the children manually. With our approach, it is also possible to pass JSON data into the `SelectorPanel`.

Speaking of the children, the objects in the list get translated into `RadioGroup` components, that each take care of their own group respectively. `RadioGroup` encapsulates an unordered list of radio inputs, complete with a legend and labels. When a radio button is pressed, the group updates its `state["value"]` to the chosen option, and notifies the parent `SelectorPanel` about what was chosen, after which the job of the radio group is complete, and the parent can take over. We're sending state to the parent, but we also keep state in the radio group, and the reason for this is because it is a controlled component; instead of letting regular HTML take care of the state of the radio buttons, we have to explicitly keep the chosen radio button as a state in the radio group.

Once the selector panel receives a notification that a radio button was pressed, it first updates its own state, which is simply a mirroring of each of the children states, but with accompanying group names as keys. It then checks if all groups have values (the values start out as empty strings and the button starts out as disabled - it doesn't make sense to generate media from an empty selection), and enables the button if this is the case.

When the user finally presses the button to generate media, the selector panel provides its state describing the group values through the `handleSubmit` callback, and the results have the following format:

```JS
{groupName1: "cat 1", groupName2: "cat 3"}
```

Which then gets sent to the method that generates a random set of media URLs from the chosen categories.

### Audio and Text components

Since our text comes in the following JSON format, it is useful to have a component that we can just throw an entire JSON into and then forget about the rest.

```json
{"title": "foo",
"author": "bob",
"text": "bar"}
```

Which is exactly what `TextPanel` implements. Its `render()` method simply fetches the title, author and text values and displays them in regular HTML elements that can be further styled through CSS. Having the text saved in a component is useful for the tabbed interface too, as each tab will have one text component each.

The `AudioPanel` component is similar, but instead of accepting a JSON it accepts an audio url instead. Its render method then gives a standard HTML5 `<audio>` tag that autoplays the sound. This means the audio will load again each time a tab is loaded (?).

## AJAX & JSON

For loading the media, we use Asynchronous JavaScript And XML (AJAX), which is just a fancy word for fetching data after the initial load of the page. We chose [Axios](https://github.com/axios/axios) as the method to do this, which is a Promise based HTTP client.

Loading text is simple enough, all we had to do was call `axios.get("url/to/our/text.json")` and then do something with the response. To do something with said response, you simply chain a `.then(response => {...})` call onto it, using an arrow function to perform operations using the response. Since we have a nice text component that accepts an entire JSON, and our texts are saved as JSON, all we have to do in the arrow function is to create a `TextPanel` with `response.data` as a prop the first time a tab is loaded. (response.data is the actual data that got fetched)

Loading images is similar, but with a slight difference since the format is in SVG this time, which means `result.data` will give a string full of the XML from the SVG file. To make this XML display as a SVG, we used the `dangerouslySetInnerHTML` attribute, which is Reacts replacement for `innerHTML`, reminding us that it is dangerous to set HTML via code. Nonetheless, this made SVG images pop up as usual, and we fulfilled the requirement of not loading SVGs more than once.

<!-- todo: how we will actually use axios -->

## Responsive web design

Today, web pages are enjoyed on devices that come in all shapes and sizes, so it is not sustainable to develop web pages that *only* work properly on the most common desktop display resolutions and aspect ratios &ndash; we'd drive away most of the people who tries to access our page via their phone or tablet, for instance.

For this reason, it is important to design web sites that are *responsive* in the sense that they conform and change the flow of the elements based on the available screen space and input methods: vertical layouts work better on mobile devices, and wide layouts work great on desktop computers. Similarly, small controls and buttons make sense for an environment where you use a mouse to click, but on a touch screen the buttons can benefit from a larger size.

In our case, we used CSS rules to have the underlying CSS grid change based on the width of the viewport. If the width went under a set limit of CSS pixels, the grid was reordered into a single-column layout, with controls on top instead of on the side.
<!-- todo: explanation of the ways to actually use responsive web design, presumably through CSS, media queries, viewports and whatnot -->

## Collaboration

When multiple people work on a project, there has to be some form of keeping track of all the changed files. For smaller stuff it can be as simple as passing around a USB stick with the files, or emailing files to each other, or keeping a shared cloud folder with the files. The inherent problem in all of these is that they soon break down once more than one person has to work on the same set of files. The solution is to use source control, in our case we use Git.

Git keeps track of each addition, deletion or change in each tracked file, and updates are done via *commits*. The idea is that you work on an issue or feature until you complete it, then create a commit. To synchronize your work with the shared repository, you *push* all the commits you've made so far, and the others can pull your changes onto their own machines.

Multiple people working on the same file might still cause a bit of headache, but that's where branches come in. Branches are simply a branch on the timeline of the repository. The timeline itself is just a series of commits. Each branch is just a pointer to the latest commit that was pushed to said branch.

In our case, we started out with a master branch with an example react project, and then started creating branches for each issue. It soon became apparent that making one branch per issue was a bit excessive because our issues were fairly small and could be completed in a couple of commits each. After a while, one of the branches (`feat/ajax` specifically) turned into a de facto development branch rather than being for its speficic issue. To solve this, we merged the branch into master and started a new development branch for further commits, mostly because it is seen as bad practice to push commits straight to master.

<!-- todo: too much general git stuff? talk more about how we used git specifically -->