export class News {
    status: string = "";
    totalResults: number = 0;
    articles: Articles[] = [];
}

export class Articles {
    source: Source = new Source;
    author: string = "";
    title: string = "";
    description: string = "";
    url: string = "";
    urlToImage: string = "";
    publishedAt: string = "";
    content: Content = new Content;
}

export class Source {
    id: string = "";
    name: string = "";
}

export class Content {
    text: string = "";
}