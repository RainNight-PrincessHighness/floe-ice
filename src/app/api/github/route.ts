import { NextResponse } from 'next/server';

export async function GET() {
  try {
  
    
    const response = await fetch('https://api.github.com/repos/RainNight-PrincessHighness/floe-ice', {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Floe-Ice-App/1.0',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      cache: 'no-cache'
    });



    if (!response.ok) {
      const errorText = await response.text();
      
      
      if (response.status === 404) {
        return NextResponse.json({
          success: false,
          error: '仓库未找到',
          message: '该仓库可能尚未推送到 GitHub 或设为私有',
          details: errorText
        }, { status: 404 });
      }
      
      return NextResponse.json({
        success: false,
        error: `GitHub API 请求失败: ${response.status} ${response.statusText}`,
        details: errorText
      }, { status: response.status });
    }

    const data = await response.json();

    
    return NextResponse.json({
      success: true,
      data: {
        name: data.name,
        full_name: data.full_name,
        description: data.description,
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count,
        language: data.language,
        updated_at: data.updated_at,
        topics: data.topics,
        open_issues_count: data.open_issues_count,
        size: data.size,
        license: data.license,
        html_url: data.html_url
      }
    });

  } catch (error) {
    
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
      details: error
    }, { status: 500 });
  }
}
