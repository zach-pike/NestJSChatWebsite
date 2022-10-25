
export async function basicJsonPostRequest<T>(path: string, object: any, token?: string): Promise<[ Error, T ]> {
    let headers = {
        'Content-Type': 'application/json'
    }

    if (token) headers['authorization'] = `Bearer ${token}`;

    let req = await fetch(`${window.location.origin}/${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(object)
    });
  
    if (!req.ok) return [ new Error(await req.text()), null ];

    return [ null, await req.json() ];
}

export async function basicJsonGetRequest<T>(path: string, body?: string, token?: string): Promise<[ Error, T ]> {
    let headers = {}
    if (token) headers['authorization'] = `Bearer ${token}`;

    let req = await fetch(`${window.location.origin}/${path}`, {
      headers,
      body
    });
  
    if (!req.ok) return [ new Error(await req.text()), null ];

    return [ null, await req.json() ];
}