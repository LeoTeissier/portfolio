interface GistFile {
    filename: string;
    type: string;
    language: string | null;
    raw_url: string;
    size: number;
    content: string;
}

interface GistOwner {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export default interface Gist {
    url: string;
    forks_url: string;
    commits_url: string;
    id: string;
    node_id: string;
    git_pull_url: string;
    git_push_url: string;
    html_url: string;
    files: { [key: string]: GistFile };
    public: boolean;
    created_at: string;
    updated_at: string;
    description: string | null;
    comments: number;
    user: any;
    comments_url: string;
    owner: GistOwner;
    truncated: boolean;
}

